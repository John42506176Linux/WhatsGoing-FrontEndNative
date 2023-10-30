import React,{useLayoutEffect} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { toggleCategory,submitCategories } from '../../actions/categoriesActions';
import { RootState } from '../../store/store';
import { ScrollView } from 'react-native';
import { categories } from '../../constants/categories_constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import { themeFonts,themeColors } from '../../styles/themeVariables';

interface CategoryProps {
  key: string;
  name: string;
  image: any; // Use appropriate type here
  selected: boolean;
  toggleCategory: (category: string) => void;
}

const Category: React.FC<CategoryProps> = ({ name, image, selected,toggleCategory }) => {
  const imageStyle = selected ? styles.selectedImage : styles.image;
  return (
    <TouchableOpacity style={styles.category} onPress={() => toggleCategory(name)}>
      <Image source={image} style={imageStyle} />
      {selected && (
        <Icon name= 'checkcircle' size={25} style={styles.checkMark} />
      )}
      <Text style={styles.categoryText}>{name}</Text>
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
      headerTitleStyle: {
        fontFamily: themeFonts.primary,
        color: themeColors.secondary,
      },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            submitCategories();
            navigation.navigate('Home'); // Replace 'Home' with the name of your home screen
          }}
          disabled={selectedCategories.length === 0}
        >
          <Text style={selectedCategories.length > 0 ? styles.headerText : styles.disabledHeaderText}>Next</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, selectedCategories]);
  return (
    <ScrollView>
      <View style={styles.container}>
      <Text style={styles.instructionText}>Select some categories to get started</Text>
      {categories.map(category => <Category key ={category.name} toggleCategory={toggleCategory} selected={selectedCategories.includes(category.name)}  {...category} />)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center'
  },
  categoryText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
    color: themeColors.secondary,
    fontFamily: themeFonts.primary,
  },
  instructionText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 20,
    color: themeColors.secondary,
    fontFamily: themeFonts.tertiary,
  },
  category: {
    width: '50%',
    padding: 10,
    borderColor: 'transparent',
    borderWidth: 2
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 10,
  },
  checkMark: {
    position: 'absolute',
    color: themeColors.primary,
    top: 20,
    right: 20,
  },
  selectedImage: {
    width: '100%',
    height: 100,
    opacity: 0.5, 
    borderWidth: 2,
    borderColor: themeColors.primary,
    borderRadius: 10,
  },
  headerText: {
    fontSize: 18,
    color: themeColors.primary,
    fontFamily: themeFonts.secondary,
  },
  disabledHeaderText: {
    fontSize: 18,
    fontWeight: '300',
    color: themeColors.secondary,
    fontFamily: themeFonts.secondary,
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
