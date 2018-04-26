'use strict'

import React from 'react';
import { AppRegistry, Animated, Easing, Image, Text, View, StyleSheet, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
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
  { label: 'Introduction'},
  { label: 'EMS Scopes of Practice'},
  { label: 'General Patient Assessment/IMC'},
  { label: 'Emergency drug alternatives'},
  { label: 'OLMC Report/Handover Reports'},
  { label: 'Withholding or Withdrawing Resuscitation'},
  { label: 'Elderly patients'},
  { label: 'Extremely obese patients'},
]

const respiratory = [
  { label: 'Airway obstruction'},
  { label: 'Drug Assisted Intubation'},
  { label: 'Allergic Reaction/Anaphylactic Shock'},
  { label: 'Asthma/COPD'},
  { label: 'Pts w/ tracheostomy (adult or peds)'},
]

const cardiac = [
  { label: 'Acute Coronary'},
  { label: 'Bradycardia with a Pulse'},
  { label: 'Narrow QRS Complex Tachycardia'},
  { label: 'Wide Complex Tachycardia with a Pulse'},
  { label: 'Ventricular fibrillation/pulseless VT'},
  { label: 'Asystole/PEA'},
  { label: 'Heart Failure/Pulmonary Edema/Cardiogenic Shock'},
  { label: 'Left ventricular assist device'},
]

const medical = [
  { label: 'Acute Abdominal/Flank Pain'},
  { label: 'Dialysis/Chronic Renal Failure'},
  { label: 'Alcohol Intoxication/Withdrawal'},
  { label: 'Altered Mental Status/Syncope & Presyncope'},
  { label: 'Drug Overdose/Poisoning'},
  { label: 'Carbon monoxide (HBO)/Cyanide exposure'},
  { label: 'Environmental emergencies: Cold related'},
  { label: 'Environmental emergencies: Submersion'},
  { label: 'Environmental emergencies: Heat related'},
  { label: 'Glucose/Diabetes Emergencies'},
  { label: 'Hypertension/Hypertensive crisis'},
  { label: 'Psych/Behavioral Emerg/Agitated/Violent Pts'},
  { label: 'Stroke – Transport algorithm'},
  { label: 'Seizures'},
  { label: 'Shock differential – Hypovolemic / Septic'},
]

const trauma = [
  { label: 'Initial trauma care (ITC)/GCS/RTS'},
  { label: 'DTriage & transport criteria (table)'},
  { label: 'Cardiac Arrest due to Trauma'},
  { label: 'Conducted electrical weapon (Taser)'},
  { label: 'Burns'},
  { label: 'Chest trauma'},
  { label: 'Eye emergencies / Facial trauma'},
  { label: 'Head trauma'},
  { label: 'Musculoskeletal trauma'},
  { label: 'Spine trauma/Equipment removal guidelines'},
  { label: 'Multiple Patient Incidents'},
  { label: 'START & JumpSTART'},
  { label: 'Hazardous Materials Incidents'},
  { label: 'Chemical Agents'},
  { label: 'Active Shooter Response'},
  { label: 'Widespread disease outbreak'},
  { label: 'Abuse and Maltreatment: Domestic/Sexual/Elder'},
  { label: 'Trauma in pregnancy '},
]

const ob = [
  { label: 'Childbirth'},
  { label: 'Newborn and post-partum care'},
  { label: 'Delivery complications'},
  { label: 'Newborn resuscitation'},
  { label: 'OB complications'},
]

const peds = [
  { label: 'Peds initial medical care'},
  { label: 'Peds IMC - GCS'},
  { label: 'Peds Secondary assessment/sedation/VS '},
  { label: 'Special Healthcare needs'},
  { label: 'Peds Airway Adjuncts'},
  { label: 'Peds Respiratory: FBO; Arrest, SIDS, BRUE'},
  { label: 'Peds Anaphylaxis / Asthma / Croup/ Epiglottitis / RSV'},
  { label: 'Peds cardiac SOPs'},
  { label: 'Peds medical SOPs'},
  { label: 'Peds ITC/Trauma score/Trauma SOPs/Abuse'},
]

const appendix = [
  { label: 'CPR: Quality criteria; peds defib table'},
  { label: 'Drug appendix' },
  { label: 'Peds DRUG calculations' },
  { label: 'Fentanyl/Ketamine Drug dosing / med routes' },
  { label: 'QT intervals; 12-lead changes in AMI' },
  { label: 'Medical abbreviations' },
  { label: 'Differential of COPD/HF; CPAP' },
  { label: 'Biologic, Nuclear, Incendiary & Chem agents' },
  { label: 'Bioterrorist & Chemical Agents' },
  { label: 'Norepinephrine MACRODRIP rates' },
  { label: 'Hospital OLMC contact information' },
  { label: 'Hospital Designations for Specialty Transports' },
  { label: 'Pain scales' },

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

//const subcategoryContainerHeight = categoryLinksLength * SUBCATEGORY_HEIGHT //total height for the container
// var heights = this.props.length * SUBCATEGORY_HEIGHT
class CategoryLinks extends React.PureComponent { //using PureComponent will prevent unnecessary renders

  toutPositions = [] //will hold the measured offsets of each tout when unexpanded

  render() {
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
                  <Text style={styles.subcategoryLinks}>{link.label}</Text>
                </View>
              )
            })
          }
        </View>
      </Animated.View>
    )
  }
}

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

export default class scrollAccordion extends React.PureComponent { //scroll accordion is our parent class - it renders the touts and their subcategories

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
