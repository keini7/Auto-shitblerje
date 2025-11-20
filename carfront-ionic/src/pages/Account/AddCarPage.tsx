import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonText,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createCar } from '../../api/cars';
import { uploadCarImage } from '../../api/upload';
import { buildImageUrl } from '../../constants/config';
import { useAuth } from '../../context/AuthContext';

const AddCarPage = () => {
  const history = useHistory();
  const { token, isLogged } = useAuth();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuel, setFuel] = useState('');
  const [transmission, setTransmission] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLogged || !token) {
      history.replace('/account/login');
    }
  }, [history, isLogged, token]);

  if (!isLogged || !token) return null;

  const onUploadClick = () => {
    fileRef.current?.click();
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (!token) return;

    try {
      setLoading(true);
      for (const file of Array.from(files)) {
        const res = await uploadCarImage(token, file);
        setImages((prev) => [...prev, res.url]);
      }
    } catch (err) {
      console.error('Upload error', err);
      setError((err as Error).message || 'Ngarkimi dështoi');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setBrand('');
    setModel('');
    setYear('');
    setPrice('');
    setMileage('');
    setFuel('');
    setTransmission('');
    setBodyType('');
    setLocation('');
    setDescription('');
    setImages([]);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !fuel.trim() || images.length === 0) {
      setError('Titulli, karburanti dhe të paktën 1 foto janë të detyrueshme.');
      return;
    }

    const payload: Record<string, unknown> = {
      title: title.trim(),
      brand: brand.trim(),
      model: model.trim(),
      fuel: fuel.trim(),
      transmission: transmission.trim(),
      body_type: bodyType.trim(),
      location: location.trim(),
      description: description.trim(),
      images,
    };

    if (year) payload.year = Number(year);
    if (price) payload.price = Number(price);
    if (mileage) payload.mileage = Number(mileage);

    try {
      setLoading(true);
      setError('');
      await createCar(token, payload);
      resetForm();
      history.replace('/tabs/account/my-cars');
    } catch (err) {
      console.error('Create car error', err);
      setError((err as Error).message || 'Nuk u ruajt dot makina');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Shto makinë</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem>
            <IonLabel position="stacked">Titulli *</IonLabel>
            <IonInput value={title} onIonInput={(e) => setTitle(e.detail.value ?? '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Marka</IonLabel>
            <IonInput value={brand} onIonInput={(e) => setBrand(e.detail.value ?? '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Modeli</IonLabel>
            <IonInput value={model} onIonInput={(e) => setModel(e.detail.value ?? '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Viti</IonLabel>
            <IonInput
              type="number"
              value={year}
              onIonInput={(e) => setYear(e.detail.value ?? '')}
              placeholder="2018"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Çmimi (€)</IonLabel>
            <IonInput
              type="number"
              value={price}
              onIonInput={(e) => setPrice(e.detail.value ?? '')}
              placeholder="10000"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Kilometra</IonLabel>
            <IonInput
              type="number"
              value={mileage}
              onIonInput={(e) => setMileage(e.detail.value ?? '')}
              placeholder="150000"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Karburanti *</IonLabel>
            <IonInput value={fuel} onIonInput={(e) => setFuel(e.detail.value ?? '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Transmisioni</IonLabel>
            <IonInput value={transmission} onIonInput={(e) => setTransmission(e.detail.value ?? '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Lloji karrocerisë</IonLabel>
            <IonInput value={bodyType} onIonInput={(e) => setBodyType(e.detail.value ?? '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Vendndodhja</IonLabel>
            <IonInput value={location} onIonInput={(e) => setLocation(e.detail.value ?? '')} />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Përshkrimi</IonLabel>
            <IonTextarea
              rows={4}
              value={description}
              onIonInput={(e) => setDescription(e.detail.value ?? '')}
              placeholder="Detaje të tjera..."
            />
          </IonItem>
        </IonList>

        <div className="ion-padding">
          <IonText>
            <p>Fotot *</p>
          </IonText>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {images.map((img) => (
              <img
                key={img}
                src={buildImageUrl(img)}
                alt="Car"
                style={{ width: 90, height: 90, borderRadius: 12, objectFit: 'cover' }}
              />
            ))}
          </div>

          <input
            type="file"
            accept="image/*"
            hidden
            multiple
            ref={fileRef}
            onChange={(e) => handleFiles(e.target.files)}
          />

          <IonButton expand="block" fill="outline" onClick={onUploadClick} disabled={loading}>
            {loading ? 'Duke ngarkuar...' : 'Shto foto'}
          </IonButton>

          {error ? (
            <IonText color="danger">
              <p>{error}</p>
            </IonText>
          ) : null}

          <IonButton
            expand="block"
            className="ion-margin-top"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <IonSpinner name="dots" /> : 'Ruaj makinën'}
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddCarPage;

