import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonList,
  IonPage,
  IonSearchbar,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { funnelOutline, swapVerticalOutline } from 'ionicons/icons';
import { useEffect, useMemo, useState } from 'react';
import { Car, searchCars } from '../../api/cars';
import CarCard from '../../components/CarCard';
import FilterModal, { FilterState } from '../../components/FilterModal';
import SortModal from '../../components/SortModal';

const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>({});
  const [sort, setSort] = useState('latest');
  const [cars, setCars] = useState<Car[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const queryParams = useMemo(
    () => ({
      ...filters,
      search,
      sort,
      limit: 10,
    }),
    [filters, search, sort],
  );

  const loadCars = async (reset = false) => {
    if (reset) {
      setLoading(true);
      setEndReached(false);
    } else {
      setLoadingMore(true);
    }

    try {
      const data = await searchCars({
        ...queryParams,
        page: reset ? 1 : page,
      });

      if (reset) {
        setCars(data.cars);
        setPage(2);
        setEndReached(data.cars.length === 0);
      } else {
        setCars((prev) => [...prev, ...data.cars]);
        setPage((prev) => prev + 1);
        if (data.cars.length === 0) setEndReached(true);
      }
    } catch (err) {
      console.error('Search error', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadCars(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, [queryParams]);

  useEffect(() => {
    loadCars(true);
  }, []);

  const handleInfinite = async (event: InfiniteScrollCustomEvent) => {
    if (!endReached && !loadingMore) {
      await loadCars(false);
    }
    event.target.complete();
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Kërko</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          value={search}
          onIonInput={(e) => setSearch(e.detail.value ?? '')}
          placeholder="Kërko p.sh. BMW 320..."
        />

        <div className="ion-padding-horizontal ion-padding-bottom" style={{ display: 'flex', gap: '12px' }}>
          <IonButton expand="block" fill="outline" onClick={() => setFilterOpen(true)}>
            <IonIcon slot="start" icon={funnelOutline} />
            Filtro
          </IonButton>
          <IonButton expand="block" fill="outline" onClick={() => setSortOpen(true)}>
            <IonIcon slot="start" icon={swapVerticalOutline} />
            Rendit
          </IonButton>
        </div>

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

        <IonInfiniteScroll onIonInfinite={handleInfinite} disabled={endReached}>
          <IonInfiniteScrollContent
            loadingSpinner="bubbles"
            loadingText={endReached ? 'Nuk ka më rezultate' : 'Duke ngarkuar...'}
          />
        </IonInfiniteScroll>

        <FilterModal
          isOpen={filterOpen}
          onDismiss={() => setFilterOpen(false)}
          onApply={(values) => {
            setFilters(values);
            setFilterOpen(false);
            setEndReached(false);
            loadCars(true);
          }}
        />
        <SortModal
          isOpen={sortOpen}
          value={sort}
          onSelect={(option) => {
            setSort(option);
            setEndReached(false);
            loadCars(true);
          }}
          onDismiss={() => setSortOpen(false)}
        />
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;

