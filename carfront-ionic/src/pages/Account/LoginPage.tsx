import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const history = useHistory();
  const { loginWithCredentials, isLogged } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLogged) {
      history.replace('/tabs/account');
    }
  }, [history, isLogged]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      await loginWithCredentials(email.trim(), password.trim());
      history.replace('/tabs/account');
    } catch (err) {
      setError((err as Error).message || 'Login dështoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Kyçu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonInput={(e) => setEmail(e.detail.value ?? '')}
            placeholder="email@shembull.com"
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Fjalëkalimi</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonInput={(e) => setPassword(e.detail.value ?? '')}
            placeholder="******"
          />
        </IonItem>

        {error ? (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        ) : null}

        <IonButton expand="block" onClick={handleSubmit} disabled={loading} className="ion-margin-top">
          {loading ? 'Duke u kyçur...' : 'Kyçu'}
        </IonButton>

        <IonText className="ion-text-center ion-margin-top">
          <p>
            Nuk ke llogari? <Link to="/account/register">Regjistrohu</Link>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;

