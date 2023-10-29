import React,{useLayoutEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { toggleCategory,submitCategories } from '../../actions/categoriesActions';
import { RootState } from '../../store/store';
import { ScrollView } from 'react-native';
import { categories } from '../../constants/categories_constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';

interface CategoryProps {
  key: string;
  name: string;
  image: any; // Use appropriate type here
  selected: boolean;
  toggleCategory: (category: string) => void;
}

const Category: React.FC<CategoryProps> = ({ name, image, selected,toggleCategory }) => {
  const categoryStyle = selected ? styles.selectedCategory : styles.category;

  return (
    <TouchableOpacity style={categoryStyle} onPress={() => toggleCategory(name)}>
      <Image source={image} style={styles.image} />
      <Text style={{ textAlign: 'center' }}>{name}</Text>
    </TouchableOpacity>
  );
};

type RootStackParamList = {
  "Home": any;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;


interface CategorySelectionProps {
  navigation: HomeScreenNavigationProp;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  submitCategories: () => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({navigation, selectedCategories, toggleCategory, submitCategories}) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Categories',
      headerRight: () => (
        selectedCategories.length > 0 ? (
          <TouchableOpacity
            onPress={() => {
              submitCategories();
              navigation.navigate('Home'); // Replace 'Home' with the name of your home screen
            }}
            disabled={selectedCategories.length === 0}
          >
            <Text style={selectedCategories.length > 0 ? styles.headerText : styles.disabledHeaderText}>Next</Text>
          </TouchableOpacity>
        ) : null
      ),
    });
  }, [navigation, selectedCategories]);
  return (
    <ScrollView>
      <View style={styles.container}>
        {categories.map(category => <Category key ={category.name} toggleCategory={toggleCategory} selected={selectedCategories.includes(category.name)}  {...category} />)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  category: {
    width: '50%',
    padding: 10,
    borderColor: 'transparent',
    borderWidth: 2
  },
  selectedCategory: {
    width: '50%',
    padding: 10,
    borderColor: 'blue',
    borderWidth: 2
  },
  image: {
    width: '100%',
    height: 100
  },
  headerText: {
    fontSize: 18,
    fontWeight: '300',
    fontFamily: 'Roboto',
  },
  disabledHeaderText: {
    fontSize: 18,
    fontWeight: '300',
    fontFamily: 'Roboto',
    color: 'gray',
  },
});

const mapStateToProps = (state: RootState) => ({
  selectedCategories: state.categories.selectedCategories,
});

const mapDispatchToProps = {
  toggleCategory,
  submitCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelection);
