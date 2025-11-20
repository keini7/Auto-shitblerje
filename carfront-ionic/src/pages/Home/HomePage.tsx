import {
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { Car, getCars } from '../../api/cars';
import CarCard from '../../components/CarCard';

const HomePage = () => {
  console.log('[HomePage] Component rendering');
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [endReached, setEndReached] = useState(false);

  const loadCars = async (pageToLoad = 1, append = false) => {
    try {
      console.log('[HomePage] Loading cars, page:', pageToLoad);
      if (append) setLoadingMore(true);
      else setLoading(true);

      const data = await getCars({ page: pageToLoad, limit: 10 });
      console.log('[HomePage] Received cars:', data.cars?.length || 0);
      
      if (append) {
        setCars((prev) => [...prev, ...data.cars]);
      } else {
        setCars(data.cars);
      }

      setEndReached(pageToLoad >= data.pages);
      setPage(pageToLoad + 1);
    } catch (err) {
      console.error('[HomePage] Error loading cars', err);
      // Set empty array on error to show something
      if (!append) {
        setCars([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  const handleRefresh = async (event: RefresherCustomEvent) => {
    await loadCars(1, false);
    event.detail.complete();
  };

  const loadMore = async (event: InfiniteScrollCustomEvent) => {
    if (endReached || loadingMore) {
      event.target.complete();
      return;
    }
    await loadCars(page, true);
    event.target.complete();
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Makinat</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {loading && cars.length === 0 ? (
          <div className="ion-text-center ion-padding">
            <IonSpinner />
          </div>
        ) : (
          <IonList lines="none">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </IonList>
        )}

        <IonInfiniteScroll onIonInfinite={loadMore} disabled={endReached}>
          <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Duke ngarkuar..." />
        </IonInfiniteScroll>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;

