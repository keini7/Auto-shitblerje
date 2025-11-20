import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Car, deleteCar, getMyCars } from '../../api/cars';
import CarCard from '../../components/CarCard';
import { useAuth } from '../../context/AuthContext';

const MyCarsPage = () => {
  const history = useHistory();
  const { token, isLogged, loading } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  const [busy, setBusy] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    const load = async () => {
      try {
        setBusy(true);
        const data = await getMyCars(token);
        setCars(data);
      } catch (err) {
        console.error('My cars error', err);
      } finally {
        setBusy(false);
      }
    };
    load();
  }, [token]);

  if (loading) {
    return (
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Makinat e mia</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="ion-text-center ion-padding">
            <IonSpinner />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  useEffect(() => {
    if (!loading && (!isLogged || !token)) {
      history.replace('/account/login');
    }
  }, [history, isLogged, loading, token]);

  if (!isLogged || !token) return null;

  const confirmDelete = async (carId: string) => {
    const ok = window.confirm('Je i sigurt që do ta fshish këtë makinë?');
    if (!ok) return;

    try {
      setDeletingId(carId);
      await deleteCar(carId, token);
      setCars((prev) => prev.filter((car) => car._id !== carId));
    } catch (err) {
      console.error('Delete car error', err);
      alert((err as Error).message || 'Nuk u fshi dot makina');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Makinat e mia</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton
          expand="block"
          onClick={() => history.push('/tabs/account/add')}
          className="ion-margin-bottom"
        >
          Shto makinë
        </IonButton>

        {busy ? (
          <div className="ion-text-center ion-padding">
            <IonSpinner />
          </div>
        ) : cars.length === 0 ? (
          <IonList>
            <IonItem lines="none">
              <IonLabel>Nuk ke ende makina të listuara.</IonLabel>
            </IonItem>
          </IonList>
        ) : (
          cars.map((car) => (
            <div key={car._id} style={{ marginBottom: 16 }}>
              <CarCard car={car} />
              <IonButton
                expand="block"
                color="danger"
                onClick={() => confirmDelete(car._id)}
                disabled={deletingId === car._id}
              >
                {deletingId === car._id ? 'Duke fshirë...' : 'Fshi makinën'}
              </IonButton>
            </div>
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default MyCarsPage;

