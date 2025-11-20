import { IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import CarCard from '../../components/CarCard';
import { useFavorites } from '../../context/FavoritesContext';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Të preferuarat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {favorites.length === 0 ? (
          <IonText color="medium">
            <p>Nuk ke shtuar ende asnjë makinë në favorites.</p>
          </IonText>
        ) : (
          favorites.map((car) => <CarCard key={car._id} car={car} />)
        )}
      </IonContent>
    </IonPage>
  );
};

export default FavoritesPage;

