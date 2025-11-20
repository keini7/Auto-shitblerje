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

const RegisterPage = () => {
  const history = useHistory();
  const { registerAccount, isLogged } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLogged) {
      history.replace('/tabs/account');
    }
  }, [history, isLogged]);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Të gjitha fushat kryesore janë të detyrueshme.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await registerAccount(name.trim(), email.trim(), password.trim(), phone.trim());
      history.replace('/tabs/account');
    } catch (err) {
      setError((err as Error).message || 'Regjistrimi dështoi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Regjistrohu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Emri</IonLabel>
          <IonInput value={name} onIonInput={(e) => setName(e.detail.value ?? '')} />
        </IonItem>

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
          <IonLabel position="stacked">Telefon (opsionale)</IonLabel>
          <IonInput
            type="tel"
            value={phone}
            onIonInput={(e) => setPhone(e.detail.value ?? '')}
            placeholder="+355..."
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
          {loading ? 'Duke krijuar...' : 'Krijo llogari'}
        </IonButton>

        <IonText className="ion-text-center ion-margin-top">
          <p>
            Ke llogari? <Link to="/account/login">Kyçu</Link>
          </p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;

