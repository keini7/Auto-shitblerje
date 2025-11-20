import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { callOutline, heart, heartOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Car, getCarById, getRelatedCars } from '../../api/cars';
import CarCard from '../../components/CarCard';
import { buildImageUrl } from '../../constants/config';
import { useFavorites } from '../../context/FavoritesContext';

import './CarDetailsPage.css';

const CarDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [related, setRelated] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const { toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setLoading(true);
        const details = await getCarById(id);
        const suggestions = await getRelatedCars(id);
        setCar(details);
        setRelated(suggestions);
      } catch (err) {
        console.error('Car details error', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading || !car) {
    return (
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Detajet</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <div className="ion-text-center ion-padding">
            <IonSpinner />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const favorite = isFavorite(car._id);

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>{car.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="car-details">
        <div className="car-details__gallery">
          {car.images?.map((img) => (
            <img key={img} src={buildImageUrl(img)} alt={car.title} />
          ))}
        </div>

        <div className="car-details__section">
          <div className="car-details__heading">
            <div>
              <h1>{car.title}</h1>
              <p>
                {car.brand} {car.model} • {car.year}
              </p>
            </div>
            <IonButton fill="clear" onClick={() => toggleFavorite(car)}>
              <IonIcon slot="icon-only" icon={favorite ? heart : heartOutline} color="danger" />
            </IonButton>
          </div>
          <p className="car-details__price">{car.price ? `${car.price} €` : 'Çmimi sipas marrëveshjes'}</p>
          <div className="car-details__specs">
            {car.fuel && <span>⛽ {car.fuel}</span>}
            {car.transmission && <span>⚙ {car.transmission}</span>}
            {car.body_type && <span>🚗 {car.body_type}</span>}
            {car.mileage && <span>🛣 {car.mileage} km</span>}
            {car.location && <span>📍 {car.location}</span>}
          </div>
          <div className="car-details__description">
            <h2>Përshkrimi</h2>
            <p>{car.description || 'Nuk ka përshkrim'}</p>
          </div>
          {car.seller && (
            <div className="car-details__seller">
              <h2>Shitësi</h2>
              <p>👤 {car.seller.name}</p>
              <p>📧 {car.seller.email}</p>
              {car.seller.phone ? <p>📞 {car.seller.phone}</p> : null}
              {car.seller.phone && (
                <IonButton
                  expand="block"
                  href={`tel:${car.seller.phone}`}
                  color="primary"
                  target="_self"
                >
                  <IonIcon slot="start" icon={callOutline} />
                  Kontakto
                </IonButton>
              )}
            </div>
          )}
        </div>

        <div className="car-details__section">
          <h2>Të ngjashme</h2>
          {related.length === 0 ? (
            <p>Nuk ka sugjerime.</p>
          ) : (
            related.map((item) => <CarCard key={item._id} car={item} />)
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CarDetailsPage;

