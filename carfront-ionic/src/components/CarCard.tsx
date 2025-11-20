import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonImg,
} from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Car } from '../api/cars';
import { buildImageUrl } from '../constants/config';
import { useFavorites } from '../context/FavoritesContext';

import './CarCard.css';

interface Props {
  car: Car;
}

const CarCard = ({ car }: Props) => {
  const history = useHistory();
  const { toggleFavorite, isFavorite } = useFavorites();

  const fav = isFavorite(car._id);

  const handleNavigate = () => {
    history.push(`/car/${car._id}`);
  };

  const onToggleFavorite: React.MouseEventHandler<HTMLIonButtonElement> = async (event) => {
    event.stopPropagation();
    await toggleFavorite(car);
  };

  return (
    <IonCard className="car-card" button onClick={handleNavigate}>
      {car.images?.length ? (
        <IonImg
          className="car-card__image"
          src={buildImageUrl(car.images[0])}
          alt={car.title}
        />
      ) : null}
      <IonCardHeader>
        <div className="car-card__header">
          <div>
            <IonCardTitle>{car.title}</IonCardTitle>
            <IonCardSubtitle>
              {car.brand} {car.model} • {car.year}
            </IonCardSubtitle>
          </div>
          <IonButton
            fill="clear"
            size="small"
            onClick={onToggleFavorite}
            aria-label="Toggle favorite"
          >
            <IonIcon slot="icon-only" icon={fav ? heart : heartOutline} color="danger" />
          </IonButton>
        </div>
      </IonCardHeader>
      <IonCardContent>
        <p className="car-card__price">{car.price ? `${car.price} €` : 'Çmimi sipas marrëveshjes'}</p>
        {car.location ? <p className="car-card__location">📍 {car.location}</p> : null}
      </IonCardContent>
    </IonCard>
  );
};

export default CarCard;

