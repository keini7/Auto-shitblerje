import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './modals.css';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Më të rejat' },
  { value: 'price_asc', label: 'Çmimi në rritje' },
  { value: 'price_desc', label: 'Çmimi në zbritje' },
  { value: 'year_desc', label: 'Viti më i ri' },
  { value: 'year_asc', label: 'Viti më i vjetër' },
  { value: 'km_asc', label: 'Kilometra më të paktë' },
  { value: 'km_desc', label: 'Kilometra më të shumtë' },
];

interface Props {
  isOpen: boolean;
  value: string;
  onSelect: (value: string) => void;
  onDismiss: () => void;
}

const SortModal = ({ isOpen, value, onSelect, onDismiss }: Props) => (
  <IonModal isOpen={isOpen} onDidDismiss={onDismiss} initialBreakpoint={0.5} breakpoints={[0, 0.5]}>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Rendit</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={onDismiss}>Mbyll</IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonRadioGroup
        value={value}
        onIonChange={(e) => {
          onSelect(e.detail.value);
          onDismiss();
        }}
      >
        <IonList inset>
          {SORT_OPTIONS.map((option) => (
            <IonItem key={option.value}>
              <IonLabel>{option.label}</IonLabel>
              <IonRadio value={option.value} />
            </IonItem>
          ))}
        </IonList>
      </IonRadioGroup>
    </IonContent>
  </IonModal>
);

export default SortModal;

