import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchCharacterDetails } from '../services/api'; // API'den karakter detayını alacak fonksiyon
import styles from './CharacterDetail.module.css';

const CharacterDetail = () => {
  const { id } = useParams(); // URL'den karakter ID'sini alıyoruz
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        setLoading(true);
        const data = await fetchCharacterDetails(id); // API'den tek karakter verisi al
        setCharacter(data);
      } catch (err) {
        setError('Karakter verisi alınırken bir hata oluştu: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadCharacter();
  }, [id]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className={styles.characterDetailWrapper}>
      <div className={styles['character-card']}>
        {character && (
          <>
            <img src={character.image} alt={character.name} />
            <div className={styles['character-card-content']}>
              <h2>{character.name}</h2>
              <p className={`${styles.status} ${styles[character.status.toLowerCase()]}`}>
                Status: {character.status}
              </p>
              <p className={styles.species}>Species: {character.species}</p>
              <p className={styles.location}>Last Known Location: {character.location.name}</p>
              <p className={styles.origin}>Origin: {character.origin.name}</p>
              <button onClick={() => navigate(-1)} className={styles.button}>Back to Character List</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;
