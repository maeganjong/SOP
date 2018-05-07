'use strict'

import React from 'react';
import { AppRegistry, Animated, Easing, Image, Button, Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { StackNavigator } from 'react-navigation';
const CONTAINER_PADDING_TOP = 20  //to leave room for the device battery bar
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'flex-start',
    //justifyContent: 'flex-start',
    paddingTop: CONTAINER_PADDING_TOP,
    backgroundColor: 'white',
    marginLeft: 5
    ,
  },
  toutText: {
    color: 'black', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 24, flex: 1
  },
  toutImage: {
    alignItems: 'flex-start', justifyContent: 'center', flex: 1,
  },
  subcategoryLinks: {
    lineHeight: 40,
  },
  sTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  }
});

const general = [ //Each tout is declared like this. Labels for each sub category
  { label: 'Introduction', page: 1},
  { label: 'EMS Scopes of Practice', page: 2},
  { label: 'General Patient Assessment/IMC', page: 3},
  { label: 'Emergency drug alternatives', page: 5},
  { label: 'OLMC Report/Handover Reports', page: 6},
  { label: 'Withholding or Withdrawing Resuscitation', page: 7},
  { label: 'Elderly patients', page: 9},
  { label: 'Extremely obese patients', page: 10},
]

const respiratory = [
  { label: 'Airway obstruction', page: 11},
  { label: 'Drug Assisted Intubation', page: 12},
  { label: 'Allergic Reaction/Anaphylactic Shock', page: 13},
  { label: 'Asthma/COPD', page: 14},
  { label: 'Pts w/ tracheostomy (adult or peds)', page: 15},
]

const cardiac = [
  { label: 'Acute Coronary', page: 16},
  { label: 'Bradycardia with a Pulse', page: 17},
  { label: 'Narrow QRS Complex Tachycardia', page: 18},
  { label: 'Wide Complex Tachycardia with a Pulse', page: 19},
  { label: 'Ventricular fibrillation/pulseless VT', page: 20},
  { label: 'Asystole/PEA', page: 21},
  { label: 'Heart Failure/Pulmonary Edema/Cardiogenic Shock', page: 22},
  { label: 'Left ventricular assist device', page: 23},
]

const medical = [
  { label: 'Acute Abdominal/Flank Pain', page: 24},
  { label: 'Dialysis/Chronic Renal Failure', page: 24},
  { label: 'Alcohol Intoxication/Withdrawal', page: 25},
  { label: 'Altered Mental Status/Syncope & Presyncope', page: 26},
  { label: 'Drug Overdose/Poisoning', page: 27},
  { label: 'Carbon monoxide (HBO)/Cyanide exposure', page: 28},
  { label: 'Environmental emergencies: Cold related', page: 29},
  { label: 'Environmental emergencies: Submersion', page: 30},
  { label: 'Environmental emergencies: Heat related', page: 31},
  { label: 'Glucose/Diabetes Emergencies', page: 32},
  { label: 'Hypertension/Hypertensive crisis', page: 33},
  { label: 'Psych/Behavioral Emerg/Agitated/Violent Pts', page: 34},
  { label: 'Stroke – Transport algorithm', page: 35},
  { label: 'Seizures', page: 37},
  { label: 'Shock differential – Hypovolemic / Septic', page: 38},
]

const trauma = [
  { label: 'Initial trauma care (ITC)/GCS/RTS', page: 39},
  { label: 'DTriage & transport criteria (table)', page: 41},
  { label: 'Cardiac Arrest due to Trauma', page: 42},
  { label: 'Conducted electrical weapon (Taser)', page: 42},
  { label: 'Burns', page: 43},
  { label: 'Chest trauma', page: 45},
  { label: 'Eye emergencies / Facial trauma', page: 46},
  { label: 'Head trauma', page: 47},
  { label: 'Musculoskeletal trauma', page: 48},
  { label: 'Spine trauma/Equipment removal guidelines', page: 49},
  { label: 'Multiple Patient Incidents', page: 51},
  { label: 'START & JumpSTART', page: 52},
  { label: 'Hazardous Materials Incidents', page: 53},
  { label: 'Chemical Agents', page: 54},
  { label: 'Active Shooter Response', page: 55},
  { label: 'Widespread disease outbreak', page: 57},
  { label: 'Abuse and Maltreatment: Domestic/Sexual/Elder', page: 58},
  { label: 'Trauma in pregnancy', page: 59},
]

const ob = [
  { label: 'Childbirth', page: 60},
  { label: 'Newborn and post-partum care', page: 61},
  { label: 'Delivery complications', page: 62},
  { label: 'Newborn resuscitation', page: 63},
  { label: 'OB complications', page: 64},
]

const peds = [
  { label: 'Peds initial medical care', page: 65},
  { label: 'Peds IMC - GCS', page: 66},
  { label: 'Peds Secondary assessment/sedation/VS ', page: 67},
  { label: 'Special Healthcare needs', page: 69},
  { label: 'Peds Airway Adjuncts', page: 70},
  { label: 'Peds Respiratory: FBO; Arrest, SIDS, BRUE', page: 68},
  { label: 'Peds Anaphylaxis / Asthma / Croup/ Epiglottitis / RSV', page: 73},
  { label: 'Peds cardiac SOPs', page: 76},
  { label: 'Peds medical SOPs', page: 78},
  { label: 'Peds ITC/Trauma score/Trauma SOPs/Abuse', page: 86},
]

const appendix = [
  { label: 'CPR: Quality criteria; peds defib table', page: 89},
  { label: 'Drug appendix' , page: 90},
  { label: 'Peds DRUG calculations' , page: 100},
  { label: 'Fentanyl/Ketamine Drug dosing / med routes', page: 102 },
  { label: 'QT intervals; 12-lead changes in AMI' , page: 103},
  { label: 'Medical abbreviations' , page: 104},
  { label: 'Differential of COPD/HF; CPAP' , page: 106},
  { label: 'Biologic, Nuclear, Incendiary & Chem agents' , page: 107},
  { label: 'Bioterrorist & Chemical Agents' , page: 108},
  { label: 'Norepinephrine MACRODRIP rates' , page: 110},
  { label: 'Hospital OLMC contact information' , page: 111},
  { label: 'Hospital Designations for Specialty Transports' , page: 112},
  { label: 'Pain scales', page: 113 },
]

const categoryTouts = [ //the touts are the clickable image items that hold our links
  { title: 'General Patient Management', links: general, length: 8 },
  { title: 'Respiratory', links: respiratory, length: 5 },
  { title: 'Cardiac', links: cardiac, length:  8},
  { title: 'Medical', links: medical, length:  15},
  { title: 'Trauma', links: trauma, length:  18},
  { title: 'OB', links: ob, length:  5},
  { title: 'PEDS', links: peds, length:  10},
  { title: 'Appendix', links: appendix, length:  13},

]

const SUBCATEGORY_FADE_TIME = 400 //time in ms to fade in / out our subcategories when the accordion animates
const SUBCATEGORY_HEIGHT = 40 //to save a costly measurement process, we know our subcategory items will always have a consistent height, so we can calculate how big the overall subcategory container height needs to expand to by multiplying this by the number of items
//const categoryLinksLength = categoryLinks.length //number of subcategory items - if we werent using the same set of links for all touts, we would need to store this within each tout class probably, to know how big each container should expand to to show all the links



class Tout extends React.PureComponent { //using PureComponent will prevent unnecessary renders

  state = {
    toutSubcategoriesVisible: false, //true when we the tout has been clicked on and subcategory items are exposed
  }

  animatedValue = new Animated.Value(0) //we will animate this value between 0 and 1 to hide and show the subcategories

  animCategoryHeight = this.animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, this.props.length * SUBCATEGORY_HEIGHT], //when animated value is 1, the subcategory container will be equal to the number of links * each links height
  })

  measurements = {} //will hold each tout's location on the page so that we can automatically scroll it to the top of our view

  measureToutRef = () => {
    this.toutRef.measure((x, y, width, height, pageX, pageY) => { //measuring gives us all of these properties, so we must capture them and pass down only the two we need
      this.measurements.pageY = pageY //Y position in the overall view
      this.measurements.height = height //height of the tout (really this is the same among all touts in our example, but we will allow our touts to have different heights this way)
      this.props.handleLayout(this.measurements, this.props.toutIndex) //pass this back to the parent (scrollAccordion)
    })
  }

  handlePressTout = () => {
    if (this.props.links && this.props.links.length) { //if the tout has subcategory links, hide or show them based on the current state
      const toutSubcategoriesVisible = this.state.toutSubcategoriesVisible
      if (toutSubcategoriesVisible) {
        this.hideToutSubcatgories()
      }
      else {
        this.showToutSubcatgories()
      }
    }
  }

  showToutSubcatgories = (pageY) => {
    this.setState({ toutSubcategoriesVisible: true })
    Animated.timing(this.animatedValue, { //animating this value from zero to one will update the subcategory container height, which interpolates this value
      toValue: 1,
      duration: SUBCATEGORY_FADE_TIME,
      easing: Easing.inOut(Easing.quad),
    }).start(() => {
      this.props.handlePressTout(this.props.toutIndex)
    })
  }

  hideToutSubcatgories = (pageY) => {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: SUBCATEGORY_FADE_TIME,
      easing: Easing.inOut(Easing.quad),
    }).start(() => {
      this.setState({ toutSubcategoriesVisible: false })
    })
  }

  setToutRef = node => { //store a reference to the tout so we can measure it
    if (node) {
      this.toutRef = node
    }
  }

  render() {
    let categoryLinks
    if (this.props.links && this.props.links.length) { //if the tout has links, render them here
      categoryLinks = (
        <Animated.View
          style={{ height: this.animCategoryHeight }}
        >
          <CategoryLinks {...this.props} isVisible={this.state.toutSubcategoriesVisible}/>
        </Animated.View>
      )
    } else {
      categoryLinks = null
    }
    return (
      <View
        style={this.props.toutIndex === 0 ? { marginTop: 0 } : { marginTop: 5 }} //if this is the first tout, no margin is needed at top
        onLayout={!this.measurements.pageY ? this.measureToutRef : () => null} //if we already have measurements for this tout, no need to render them again. Otherwise, get the measurements
      >
        <TouchableOpacity
          ref={this.setToutRef}
          onPress={this.handlePressTout}
        >
          <ImageBackground
            source={require('./assets/images/white.jpg')}
            style={styles.toutImage}
            width={'100px'}
            height={206.6}
            >
            <Text
              style={styles.toutText} //text is wrapped by image so it can be easily centered
            >
              {this.props.title}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
        {categoryLinks}
      </View>
    )
  }
}

AppRegistry.registerComponent('Tout', () => Tout);

class scrollAccordion extends React.PureComponent { //scroll accordion is our parent class - it renders the touts and their subcategories

  measurements = []

  handlePressTout = (toutIndex) => { //when we press a tout, animate it to the top of the screen and reveal its subcategoires
    this.scrollViewRef.scrollTo({
      y: this.measurements[toutIndex].pageY - CONTAINER_PADDING_TOP,
    })
  }

  setScrollRef = node => { //store a reference to the scroll view so we can call its scrollTo method
    if (node) {
      this.scrollViewRef = node
    }
  }

  handleLayout = (measurements, toutIndex) => { //this process is expensive, so we only want to measure when necessary. Probably could be optimized even further...
    if (!this.measurements[toutIndex]) { //if they dont already exist...
      this.measurements[toutIndex] = measurements //...put the measurements of each tout into its proper place in the array
    }

  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={20} //throttling the scroll event will decrease the amount of times we store the current scroll position.
          ref={this.setScrollRef}
        >
          <View>
            <Text style = {styles.sTitle}>Standard Operating Procedures</Text>
            {
              categoryTouts.map((tout, index) => {
                return (
                  <Tout
                    key={index}
                    toutIndex={index} //tout index will help us know which tout we are clicking on
                    {...tout}
                    handleLayout={this.handleLayout} //when layout is triggered for touts, we can measure them
                    handlePressTout={this.handlePressTout}
                  />
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}


class pdfScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Pdf')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}



//const subcategoryContainerHeight = categoryLinksLength * SUBCATEGORY_HEIGHT //total height for the container
// var heights = this.props.length * SUBCATEGORY_HEIGHT


class CategoryLinks extends React.PureComponent { //using PureComponent will prevent unnecessary renders
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Animated.View //view should be animated because its opacity will change
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <View>
          {
            this.props.links && this.props.links.map((link) => { //render our subcategory links
              return (
                <View
                  key={link.label}
                >
                  <Text onPress={() => navigate('Pdf'/*, {pageNum: link.page,});*/)} style={styles.subcategoryLinks}>{link.label}</Text>
                </View>
              )
            })
          }
        </View>
      </Animated.View>
    )
  }
}

const RootStack = StackNavigator({
  Home: {
    screen: scrollAccordion
  },
  Pdf: {
    screen: pdfScreen
  },
});
AppRegistry.registerComponent('SOP', () => scrollAccordion);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
