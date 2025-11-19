import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import FilterModal from "../../components/FilterModal";
import SortModal from "../../components/SortModal";

import { searchCars } from "../../api/cars";
import CarCard from "../../components/CarCard";

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("latest");

  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [isEnd, setIsEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  // =====================
  // LOAD CARS
  // =====================
  const loadCars = async (reset = false) => {
    if (loading || (isEnd && !reset)) return;

    setLoading(true);

    const query = {
      search,
      sort,
      limit: 15,
      page: reset ? 1 : page,
      ...filters,
    };

    try {
      const data = await searchCars(query);

      if (reset) {
        setCars(data.cars);
        setPage(2);
        setIsEnd(data.cars.length === 0);
      } else {
        if (data.cars.length === 0) setIsEnd(true);
        setCars((prev) => [...prev, ...data.cars]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  // =====================
  // FILTERS
  // =====================
  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
    setIsEnd(false);
    loadCars(true);
  };

  // =====================
  // SORT
  // =====================
  const applySort = (option) => {
    setSort(option);
    setShowSort(false);
    setIsEnd(false);
    loadCars(true);
  };

  // =====================
  // SEARCH (DEBOUNCE 300ms)
  // =====================
  useEffect(() => {
    const delay = setTimeout(() => {
      setIsEnd(false);
      loadCars(true);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  // =====================
  // FIRST LOAD
  // =====================
  useEffect(() => {
    loadCars(true);
  }, []);

  return (
    <View className="flex-1 bg-black p-4">

      {/* SEARCH BAR */}
      <View className="flex-row items-center bg-gray-900 p-3 rounded-xl mb-4">
        <Ionicons name="search" size={20} color="#777" />
        <TextInput
          placeholder="Kërko p.sh. BMW 320..."
          placeholderTextColor="#666"
          value={search}
          onChangeText={setSearch}
          className="text-white flex-1 ml-3"
        />
      </View>

      {/* FILTER + SORT BUTTONS */}
      <View className="flex-row mb-4">
        <TouchableOpacity
          onPress={() => setShowFilters(true)}
          className="flex-row items-center bg-gray-800 px-4 py-2 rounded-xl mr-3"
        >
          <Ionicons name="filter" size={18} color="#00aaff" />
          <Text className="text-white ml-2">Filtro</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowSort(true)}
          className="flex-row items-center bg-gray-800 px-4 py-2 rounded-xl"
        >
          <Ionicons name="swap-vertical" size={18} color="#00aaff" />
          <Text className="text-white ml-2">Rendit</Text>
        </TouchableOpacity>
      </View>

      {/* RESULTS LIST */}
      <FlatList
        data={cars}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <CarCard car={item} navigation={navigation} />
        )}
        onEndReached={() => loadCars(false)}
        onEndReachedThreshold={0.3}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="large" color="#00aaff" className="my-4" />
          ) : null
        }
      />

      {/* MODALS */}
      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={applyFilters}
      />

      <SortModal
        visible={showSort}
        onClose={() => setShowSort(false)}
        sort={sort}
        onSelect={applySort}
      />

    </View>
  );
}
