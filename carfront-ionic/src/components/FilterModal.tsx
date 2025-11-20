import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { getBrands, getModels } from '../api/cars';
import './modals.css';

export interface FilterState {
  brand?: string;
  model?: string;
  minPrice?: string;
  maxPrice?: string;
  minYear?: string;
  maxYear?: string;
}

interface Props {
  isOpen: boolean;
  onDismiss: () => void;
  onApply: (filters: FilterState) => void;
}

const FilterModal = ({ isOpen, onDismiss, onApply }: Props) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (err) {
        console.error('Brands error', err);
      }
    })();
  }, [isOpen]);

  useEffect(() => {
    if (!brand) {
      setModels([]);
      setModel('');
      return;
    }
    (async () => {
      try {
        const data = await getModels(brand);
        setModels(data);
      } catch (err) {
        console.error('Models error', err);
      }
    })();
  }, [brand]);

  const reset = () => {
    setBrand('');
    setModel('');
    setMinPrice('');
    setMaxPrice('');
    setMinYear('');
    setMaxYear('');
  };

  const apply = () => {
    onApply({
      brand,
      model,
      minPrice,
      maxPrice,
      minYear,
      maxYear,
    });
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onDismiss} initialBreakpoint={0.75} breakpoints={[0, 0.75]}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Filtro</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onDismiss}>Mbyll</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList inset>
          <IonItem>
            <IonLabel position="stacked">Marka</IonLabel>
            <IonSelect
              placeholder="Zgjidh markën"
              value={brand}
              onIonChange={(e) => setBrand(e.detail.value)}
              interface="popover"
            >
              <IonSelectOption value="">Të gjitha</IonSelectOption>
              {brands.map((item) => (
                <IonSelectOption key={item} value={item}>
                  {item}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          {models.length > 0 && (
            <IonItem>
              <IonLabel position="stacked">Modeli</IonLabel>
              <IonSelect
                placeholder="Zgjidh modelin"
                value={model}
                onIonChange={(e) => setModel(e.detail.value)}
                interface="popover"
              >
                <IonSelectOption value="">Të gjitha</IonSelectOption>
                {models.map((item) => (
                  <IonSelectOption key={item} value={item}>
                    {item}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          )}

          <IonItem>
            <IonLabel position="stacked">Çmimi Min (€)</IonLabel>
            <IonInput
              type="number"
              value={minPrice}
              onIonInput={(e) => setMinPrice(e.detail.value ?? '')}
              placeholder="Min"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Çmimi Max (€)</IonLabel>
            <IonInput
              type="number"
              value={maxPrice}
              onIonInput={(e) => setMaxPrice(e.detail.value ?? '')}
              placeholder="Max"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Viti Min</IonLabel>
            <IonInput
              type="number"
              value={minYear}
              onIonInput={(e) => setMinYear(e.detail.value ?? '')}
              placeholder="Min"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Viti Max</IonLabel>
            <IonInput
              type="number"
              value={maxYear}
              onIonInput={(e) => setMaxYear(e.detail.value ?? '')}
              placeholder="Max"
            />
          </IonItem>
        </IonList>

        <div className="modal-actions">
          <IonButton expand="block" color="medium" onClick={reset}>
            Reseto
          </IonButton>
          <IonButton expand="block" onClick={apply}>
            Apliko
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default FilterModal;

