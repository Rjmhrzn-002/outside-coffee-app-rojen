import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import SearchIcon from '@assets/icons/home/search.svg';
import FilterIcon from '@assets/icons/home/setting.svg';
import CustomText from '@components/global/CustomText';
import {COLORS, SPACING, BORDER_RADIUS, FONT_SIZES} from '../../Constants';
import {ICoffee} from '@type/app.type';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  coffeeList: any[];
  onClick: (item: ICoffee) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  coffeeList,
  onClick,
}) => {
  const filteredResults = searchQuery
    ? coffeeList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : ['No Coffee Found'];

  return (
    <View style={{position: 'relative', marginHorizontal: SPACING.LG}}>
      {/* Search Input Container */}
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
        <TouchableOpacity style={styles.filterButton}>
          <FilterIcon width={24} height={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Search Results */}
      {searchQuery.length > 0 ? (
        filteredResults.length > 0 ? (
          <View style={styles.searchDropdown}>
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
                  style={{padding: 5}}
                  onPress={() => onClick(item.id)}>
                  <CustomText weight="MEDIUM" style={styles.searchResultText}>
                    {item.name}
                  </CustomText>
                </TouchableOpacity>
              )}
            />
          </View>
        ) : (
          <View style={styles.noResultsContainer}>
            <CustomText weight="SEMI_BOLD" style={styles.noResultsTitle}>
              No Coffee Found !!
            </CustomText>
            <CustomText style={styles.noResultsMessage}>
              Couldn't find any coffee matching "{searchQuery}".
            </CustomText>
            <CustomText>Try a different search term.</CustomText>
          </View>
        )
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY,
    borderRadius: BORDER_RADIUS.MD,
    paddingHorizontal: SPACING.SM,
    paddingVertical: SPACING.SM,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: SPACING.SM,
    color: COLORS.TEXT,
  },
  filterButton: {
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.SM,
    borderRadius: BORDER_RADIUS.SM,
    marginLeft: SPACING.SM,
  },
  searchDropdown: {
    position: 'absolute',
    top: 60 + SPACING.SM,
    zIndex: 10,
    minHeight: 50,
    backgroundColor: COLORS.DARK_GRAY,
    width: '100%',
    borderRadius: BORDER_RADIUS.MD,
    padding: SPACING.SM,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
  },
  searchResultText: {
    color: COLORS.WHITE,
    paddingVertical: 4,
  },
  noResultsContainer: {
    position: 'absolute',
    top: 60 + SPACING.SM,
    zIndex: 10,
    minHeight: 50,
    borderRadius: SPACING.MD,
    backgroundColor: COLORS.DARK_GRAY,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GRAY,
    padding: SPACING.MD,
  },
  noResultsTitle: {
    fontSize: FONT_SIZES.LG,
    color: COLORS.TEXT,
    marginBottom: SPACING.XS,
  },
  noResultsMessage: {
    fontSize: FONT_SIZES.MD,
    color: COLORS.TEXT,
    textAlign: 'center',
  },
});

export default SearchBar;
