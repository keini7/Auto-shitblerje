import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getMyCars } from '../../api/cars';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';

const AccountHomePage = () => {
  const history = useHistory();
  const { user, token, logout, loading, isLogged } = useAuth();
  const { favorites } = useFavorites();
  const [myCarsCount, setMyCarsCount] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const loadStats = async () => {
      try {
        setStatsLoading(true);
        const data = await getMyCars(token);
        setMyCarsCount(data.length);
      } catch (err) {
        console.error('Stats error', err);
      } finally {
        setStatsLoading(false);
      }
    };
    loadStats();
  }, [token]);

  if (loading) {
    return (
      <IonPage>
        <IonHeader translucent>
          <IonToolbar>
            <IonTitle>Llogaria</IonTitle>
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
    if (!loading && (!isLogged || !user)) {
      history.replace('/account/login');
    }
  }, [history, isLogged, loading, user]);

  if (!isLogged || !user) return null;

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Profili im</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{user.name}</IonCardTitle>
            <IonCardSubtitle>{user.email}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>📞 {user.phone || 'Pa numër telefoni'}</p>
          </IonCardContent>
        </IonCard>

        <div style={{ display: 'flex', gap: '12px', marginTop: 16 }}>
          <IonCard style={{ flex: 1 }}>
            <IonCardContent className="ion-text-center">
              <h2>{statsLoading ? '...' : myCarsCount}</h2>
              <p>Makinat e mia</p>
            </IonCardContent>
          </IonCard>
          <IonCard style={{ flex: 1 }}>
            <IonCardContent className="ion-text-center">
              <h2>{favorites.length}</h2>
              <p>Të preferuarat</p>
            </IonCardContent>
          </IonCard>
        </div>

        <IonButton
          expand="block"
          className="ion-margin-top"
          onClick={() => history.push('/tabs/account/add')}
        >
          Shto makinë
        </IonButton>
        <IonButton
          expand="block"
          fill="outline"
          className="ion-margin-top"
          onClick={() => history.push('/tabs/account/my-cars')}
        >
          Shiko makinat e mia
        </IonButton>
        <IonButton
          expand="block"
          fill="clear"
          className="ion-margin-top"
          onClick={() => history.push('/tabs/favorites')}
        >
          Të preferuarat
        </IonButton>

        <IonButton expand="block" color="danger" className="ion-margin-top" onClick={logout}>
          Dil nga llogaria
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AccountHomePage;

