import React, { useEffect, useState } from 'react';
import { fetchAllCharacters } from '../services/api';

const CharacterList = () => {
  const [allCharacters, setAllCharacters] = useState([]); // Tüm karakterler
  const [filteredCharacters, setFilteredCharacters] = useState([]); // Filtrelenmiş karakterler
  const [currentPageCharacters, setCurrentPageCharacters] = useState([]); // Mevcut sayfadaki karakterler
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Arama terimi
  const [statusFilter, setStatusFilter] = useState(''); // Status filtresi
  const [speciesFilter, setSpeciesFilter] = useState(''); // Species filtresi
  const [currentPage, setCurrentPage] = useState(1); // Mevcut sayfa
  const [sortOrder, setSortOrder] = useState({}); // Sütun bazlı sıralama
  const itemsPerPage = 20; // Sayfa başına gösterilecek karakter sayısı

  useEffect(() => {
    const loadAllCharacters = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCharacters(); // Tüm karakterleri yükle
        if (Array.isArray(data)) {  // Eğer veri dizisi şeklinde geldiyse
          setAllCharacters(data);
          setFilteredCharacters(data); // Başlangıçta tüm karakterler gösterilir
        } else {
          throw new Error('Veri formatı hatalı');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    loadAllCharacters();
  }, []);

  // Mevcut sayfadaki karakterleri ayarla
  useEffect(() => {
    if (filteredCharacters && filteredCharacters.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setCurrentPageCharacters(filteredCharacters.slice(startIndex, endIndex));
    } else {
      setCurrentPageCharacters([]); // Eğer filtrelenmiş karakter yoksa, boş sayfa göster
    }
  }, [currentPage, filteredCharacters]);

  // Filtreleme işlemi
  const handleSearch = () => {
    if (!allCharacters || allCharacters.length === 0) {
      return; // Eğer karakterler boşsa veya geçerli değilse, filtreleme işlemini yapma
    }
  
    const filtered = allCharacters.filter((character) => {
      return (
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter ? character.status.toLowerCase() === statusFilter.toLowerCase() : true) &&
        (speciesFilter ? character.species.toLowerCase().includes(speciesFilter.toLowerCase()) : true)
      );
    });
  
    setFilteredCharacters(filtered);
    setCurrentPage(1); // Sayfayı sıfırla
  };
  

  const handleNameSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSpeciesFilter = (e) => {
    setSpeciesFilter(e.target.value);
  };

  // Dinamik sıralama işlemi
  const handleSort = (key) => {
    let newOrder;
    let sorted;

    if (key === 'name') {
      // Alphabetical sort
      newOrder = sortOrder[key] === 'asc' ? 'desc' : 'asc';
      sorted = [...filteredCharacters].sort((a, b) =>
        newOrder === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key])
      );
    } else if (key === 'status') {
      // Status sort (Alive -> Dead -> Unknown)
      const statusOrder = ['Alive', 'Dead', 'Unknown'];
      newOrder = sortOrder[key] === 'asc' ? 'desc' : 'asc';

      sorted = [...filteredCharacters].sort((a, b) => {
        const indexA = statusOrder.indexOf(a[key]) !== -1 ? statusOrder.indexOf(a[key]) : 999;
        const indexB = statusOrder.indexOf(b[key]) !== -1 ? statusOrder.indexOf(b[key]) : 999;

        return newOrder === 'asc' ? indexA - indexB : indexB - indexA;
      });
    }

    setFilteredCharacters(sorted);
    setSortOrder({ [key]: newOrder }); // Sıralama düzenini kaydet
    setCurrentPage(1); // Sıralama sonrası sayfayı sıfırla
  };

  // Filtreleme işlemini her input değişikliğinde uygulamak
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      handleSearch(); // Arama işlemi geciktirilmiş şekilde yapılır
    }, 1); // 1 ms gecikmeli
  
    return () => clearTimeout(debounceTimeout); // Temizleme işlemi
  }, [searchTerm, statusFilter, speciesFilter]);
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Rick and Morty Characters</h2>

      {/* Arama Çubuğu */}
      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleNameSearch}
        style={{ marginBottom: '20px', padding: '5px', width: '300px' }}
      />

      {/* Status Filtresi */}
      <select value={statusFilter} onChange={handleStatusFilter} style={{ marginBottom: '20px', padding: '5px' }}>
        <option value="">All Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="Unknown">Unknown</option>
      </select>

      {/* Species Filtresi */}
      <input
        type="text"
        placeholder="Filter by species..."
        value={speciesFilter}
        onChange={handleSpeciesFilter}
        style={{ marginBottom: '20px', padding: '5px', width: '300px' }}
      />

      {/* Tablo */}
      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Image</th>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
              Name {sortOrder.name === 'asc' ? '(A-Z)' : sortOrder.name === 'desc' ? '(Z-A)' : ''}
            </th>
            <th onClick={() => handleSort('status')} style={{ cursor: 'pointer' }}>
              Status {sortOrder.status === 'asc' ? '(Ascending)' : sortOrder.status === 'desc' ? '(Descending)' : ''}
            </th>
            <th>Species</th>
          </tr>
        </thead>
        <tbody>
          {currentPageCharacters.map((character) => (
            <tr key={character.id}>
              <td>
                <img src={character.image} alt={character.name} style={{ width: '50px', height: '50px' }} />
              </td>
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.species}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sayfalama */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          style={{ marginRight: '10px' }}
        >
          First
        </button>
        <button
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
          style={{ marginRight: '10px' }}
        >
          Previous
        </button>

        {/* Sayfa numaralarını göster */}
        {Array.from({ length: Math.ceil(filteredCharacters.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            style={{
              margin: '0 5px',
              fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
            }}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prevPage) =>
              Math.min(prevPage + 1, Math.ceil(filteredCharacters.length / itemsPerPage))
            )
          }
          disabled={currentPage === Math.ceil(filteredCharacters.length / itemsPerPage)}
          style={{ marginLeft: '10px' }}
        >
          Next
        </button>
        <button
          onClick={() =>
            setCurrentPage(Math.ceil(filteredCharacters.length / itemsPerPage))
          }
          disabled={currentPage === Math.ceil(filteredCharacters.length / itemsPerPage)}
          style={{ marginLeft: '10px' }}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default CharacterList;
