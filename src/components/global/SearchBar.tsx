import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Text,
} from 'react-native';
import SearchIcon from '@assets/icons/home/search.svg';
import FilterIcon from '@assets/icons/home/setting.svg';
import CustomText from '@components/global/CustomText';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZES} from '../../Constants';
import {ICoffee} from '@type/app.type';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  coffeeList: ICoffee[];
  onClick: (item: ICoffee) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  coffeeList,
  onClick,
}) => {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState({min: 0, max: 1000});
  const [selectedRoastLevels, setSelectedRoastLevels] = useState<number[]>([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const roastLevels = [
    ...new Set(
      coffeeList
        .map(coffee => coffee.roast_level)
        .filter(level => level !== null && level !== undefined),
    ),
  ];

  const filteredResults = coffeeList.filter(item => {
    // Name filter
    const nameMatch = searchQuery
      ? item.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Price filter
    const priceMatch =
      item.price >= priceRange.min && item.price <= priceRange.max;

    // Roast level filter
    const roastLevelMatch =
      selectedRoastLevels.length === 0 ||
      selectedRoastLevels.includes(item.roast_level);

    return nameMatch && priceMatch && roastLevelMatch;
  });

  const toggleRoastLevel = (roastLevel: number) => {
    if (selectedRoastLevels.includes(roastLevel)) {
      setSelectedRoastLevels(selectedRoastLevels.filter(r => r !== roastLevel));
    } else {
      setSelectedRoastLevels([...selectedRoastLevels, roastLevel]);
    }
  };

  const applyFilters = () => {
    setFiltersApplied(
      selectedRoastLevels.length > 0 ||
        priceRange.min > 0 ||
        priceRange.max < 1000,
    );

    setFilterModalVisible(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange({min: 0, max: 1000});
    setSelectedRoastLevels([]);
    setFiltersApplied(false);
  };

  return (
    <View style={{position: 'relative', marginHorizontal: SPACING.LG}}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon width={24} height={24} />
          <TextInput
            value={searchQuery}
            style={styles.searchInput}
            keyboardType="default"
            placeholder="Search coffee"
            onChangeText={text => setSearchQuery(text)}
            placeholderTextColor={COLORS.TEXT}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filtersApplied ? styles.filterButtonActive : {},
          ]}
          onPress={() => setFilterModalVisible(true)}>
          <FilterIcon width={24} height={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Search Results */}
      {(searchQuery.length > 0 || filtersApplied) && (
        <View style={styles.searchDropdown}>
          {/* Active Filters Display */}
          {filtersApplied && (
            <View style={styles.activeFiltersContainer}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <CustomText weight="BOLD" style={styles.activeFiltersTitle}>
                  Active Filters:
                </CustomText>
                <TouchableOpacity onPress={resetFilters}>
                  <CustomText weight="BOLD" style={styles.clearFilterText}>
                    Clear All Filters
                  </CustomText>
                </TouchableOpacity>
              </View>
              <View style={styles.filterChipsContainer}>
                {(priceRange.min > 0 || priceRange.max < 1000) && (
                  <View style={styles.filterChip}>
                    <CustomText weight="MEDIUM" style={styles.filterChipText}>
                      Price: ${priceRange.min} - ${priceRange.max}
                    </CustomText>
                  </View>
                )}
                {selectedRoastLevels.length > 0 && (
                  <View style={styles.filterChip}>
                    <CustomText weight="MEDIUM" style={styles.filterChipText}>
                      Roast: {selectedRoastLevels.join(', ')}
                    </CustomText>
                  </View>
                )}
              </View>
            </View>
          )}

          {filteredResults.length > 0 ? (
            <FlatList
              data={filteredResults}
              keyExtractor={item => item._id.toString()}
              ItemSeparatorComponent={() => (
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    backgroundColor: COLORS.LIGHT_GRAY,
                  }}
                />
              )}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.searchResultItem}
                  onPress={() => {
                    setSearchQuery('');
                    onClick(item);
                  }}>
                  <CustomText weight="MEDIUM" style={styles.searchResultText}>
                    {item.name}
                  </CustomText>
                  <View style={styles.resultDetails}>
                    <CustomText weight="MEDIUM" style={styles.resultPrice}>
                      ${item.price}
                    </CustomText>
                    <CustomText style={styles.resultRoast}>
                      Roast: {item.roast_level ?? 'N/A'}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <CustomText weight="SEMI_BOLD" style={styles.noResultsTitle}>
                No Coffee Found!
              </CustomText>
              <CustomText style={styles.noResultsMessage}>
                {searchQuery
                  ? `Couldn't find any coffee matching "${searchQuery}"`
                  : 'No coffees match the selected filters'}
              </CustomText>
              <CustomText>
                Try different search terms or adjust your filters.
              </CustomText>
            </View>
          )}
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <CustomText weight="BOLD" style={styles.modalTitle}>
                Filter Options
              </CustomText>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <CustomText weight="MEDIUM" style={styles.closeButton}>
                  ✕
                </CustomText>
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <CustomText weight="SEMI_BOLD" style={styles.filterSectionTitle}>
                Price Range
              </CustomText>
              <View style={styles.priceRangeContainer}>
                <View style={styles.priceInputContainer}>
                  <CustomText weight="BOLD" style={{color: COLORS.PRIMARY}}>
                    $
                  </CustomText>
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    value={priceRange.min.toString()}
                    onChangeText={value => {
                      // Allow empty string for clearing the input
                      if (value === '') {
                        setPriceRange({
                          ...priceRange,
                          min: 0,
                        });
                      } else {
                        setPriceRange({
                          ...priceRange,
                          min: parseFloat(value) || 0,
                        });
                      }
                    }}
                  />
                </View>
                <CustomText>to</CustomText>
                <View style={styles.priceInputContainer}>
                  <CustomText weight="BOLD" style={{color: COLORS.PRIMARY}}>
                    $
                  </CustomText>
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    value={priceRange.max.toString()}
                    onChangeText={value => {
                      if (value === '') {
                        setPriceRange({
                          ...priceRange,
                          max: 0,
                        });
                      } else {
                        const parsedValue = parseFloat(value) || 0;
                        const limitedValue = Math.min(parsedValue, 1000);
                        setPriceRange({
                          ...priceRange,
                          max: limitedValue,
                        });
                      }
                    }}
                  />
                </View>
              </View>
            </View>

            <View style={styles.filterSection}>
              <CustomText weight="SEMI_BOLD" style={styles.filterSectionTitle}>
                Roast Levels
              </CustomText>
              <View style={styles.categoriesContainer}>
                {roastLevels.map(roastLevel => (
                  <TouchableOpacity
                    key={roastLevel}
                    style={[
                      styles.categoryChip,
                      selectedRoastLevels.includes(roastLevel)
                        ? styles.categoryChipSelected
                        : {},
                    ]}
                    onPress={() => toggleRoastLevel(roastLevel)}>
                    <CustomText
                      style={[
                        styles.categoryChipText,
                        selectedRoastLevels.includes(roastLevel)
                          ? styles.categoryChipTextSelected
                          : {},
                      ]}>
                      {roastLevel}
                    </CustomText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterActions}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetFilters}>
                <CustomText weight="SEMI_BOLD" style={styles.resetButtonText}>
                  Reset
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={applyFilters}>
                <CustomText weight="SEMI_BOLD" style={styles.applyButtonText}>
                  Apply Filters
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.GRAY,
    padding: SPACING.XS,
    borderRadius: BORDER_RADIUS.MD,
    width: '100%',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.MD,
    height: 45,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.SM,
    fontSize: FONT_SIZES.MD,
    color: COLORS.TEXT,
  },
  filterButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.MD,
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: SPACING.SM,
  },
  filterButtonActive: {
    backgroundColor: COLORS.PRIMARY,
  },
  searchDropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: COLORS.OFF_WHITE,
    borderRadius: BORDER_RADIUS.MD,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    marginTop: SPACING.SM,
    maxHeight: 300,
    zIndex: 1000,
  },
  searchResultItem: {
    padding: SPACING.MD,
  },
  searchResultText: {
    fontSize: FONT_SIZES.MD,
    color: COLORS.TEXT,
  },
  resultDetails: {
    flexDirection: 'row',
    marginTop: SPACING.XS,
  },
  resultPrice: {
    fontSize: FONT_SIZES.SM,
    color: COLORS.PRIMARY,
    marginRight: SPACING.MD,
  },
  resultRoast: {
    fontSize: FONT_SIZES.SM,
    color: COLORS.TEXT,
  },
  noResultsContainer: {
    padding: SPACING.LG,
    alignItems: 'center',
  },
  noResultsTitle: {
    fontSize: FONT_SIZES.LG,
    marginBottom: SPACING.SM,
    color: COLORS.TEXT,
  },
  noResultsMessage: {
    fontSize: FONT_SIZES.MD,
    color: COLORS.TEXT,
    marginBottom: SPACING.SM,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: BORDER_RADIUS.LG,
    borderTopRightRadius: BORDER_RADIUS.LG,
    padding: SPACING.LG,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  modalTitle: {
    fontSize: FONT_SIZES.XL,
    color: COLORS.TEXT,
  },
  closeButton: {
    fontSize: FONT_SIZES.LG,
    color: COLORS.TEXT,
  },
  filterSection: {
    marginBottom: SPACING.LG,
  },
  filterSectionTitle: {
    fontSize: FONT_SIZES.MD,
    color: COLORS.TEXT,
    marginBottom: SPACING.MD,
  },
  priceRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_SOFT,
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.SM,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    width: '40%',
  },
  priceInput: {
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.XS,
    width: '80%',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryChip: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: BORDER_RADIUS.MD,
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.MD,
    marginRight: SPACING.SM,
    marginBottom: SPACING.SM,
  },
  categoryChipSelected: {
    backgroundColor: COLORS.PRIMARY,
  },
  categoryChipText: {
    fontSize: FONT_SIZES.SM,
    color: COLORS.WHITE,
  },
  categoryChipTextSelected: {
    color: COLORS.WHITE,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: SPACING.MD,
  },
  resetButton: {
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: BORDER_RADIUS.MD,
    paddingVertical: SPACING.MD,
    flex: 1,
  },
  resetButtonText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.MD,
    textAlign: 'center',
  },
  applyButton: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: BORDER_RADIUS.MD,
    paddingVertical: SPACING.MD,
    flex: 1,
  },
  applyButtonText: {
    color: COLORS.WHITE,
    fontSize: FONT_SIZES.MD,
    textAlign: 'center',
  },
  activeFiltersContainer: {
    padding: SPACING.SM,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.LIGHT_GRAY,
  },
  activeFiltersTitle: {
    fontSize: FONT_SIZES.SM,
    color: COLORS.TEXT,
    marginBottom: SPACING.XS,
  },
  clearFilterText: {
    fontSize: FONT_SIZES.XS,
    color: COLORS.OFF_WHITE,
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.XS,
    borderRadius: BORDER_RADIUS.SM,
  },
  filterChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: COLORS.PRIMARY_SOFT,
    borderRadius: BORDER_RADIUS.SM,
    paddingVertical: SPACING.XS,
    paddingHorizontal: SPACING.SM,
    marginRight: SPACING.SM,
    marginBottom: SPACING.XS,
  },
  filterChipText: {
    fontSize: FONT_SIZES.XS,
    color: COLORS.PRIMARY,
  },
});

export default SearchBar;
