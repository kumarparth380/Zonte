
import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawer from '../Common/CustomDrawer';
import LoginScreen from '../Pages/Login';
import SignUp from '../Pages/Signup';
import OTP from '../Pages/OTP';
import ResetPassword from '../Pages/ResetPassword';
import ForgotPassword from '../Pages/ForgotPassword';
import Terms from '../Pages/Terms';
import Privacy from '../Pages/Privacy';
import About from '../Pages/About';
// Side menu screen
import Dashboard from '../Pages/Dashboard';
import Favorite from '../Pages/Favorite';
import Notification from '../Pages/Notification';
import Popular from '../Pages/Popular';
import Help from '../Pages/Help';
import Report from '../Pages/Report';
import Settings from '../Pages/Settings';
import Profile from '../Pages/Profile';
import Career from '../Pages/Career';
import Careers from '../Pages/Career/Career';
import CourseDetails from '../Pages/Career/CourseDetails';
import Filter from '../Pages/Filter';
import Estado from '../Pages/Filter/State';
import Servicio from '../Pages/Filter/Service';
import WebViews from '../Pages/WebView';

//For App navigation screens
const Route1 = createStackNavigator({
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            header: null,
        }
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            header: null,
        }
    },
    OTP: {
        screen: OTP,
        navigationOptions: {
            header: null,
        }
    },
    ResetPassword: {
        screen: ResetPassword,
        navigationOptions: {
            header: null,
        }
    },
    Terms: {
        screen: Terms,
        navigationOptions: {
            header: null,
        }
    },
    Privacy: {
        screen: Privacy,
        navigationOptions: {
            header: null,
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            header: null,
        }
    },
}, {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
});

const CareerStack = createStackNavigator({
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null,
        }
    },
    Careers: {
        screen: Careers,
        navigationOptions: {
            header: null,
        }
    },
    CourseDetails: {
        screen: CourseDetails,
        navigationOptions: {
            header: null,
        }
    },
    Filter: {
        screen: Filter,
        navigationOptions: {
            header: null,
        }
    },
    Estado: {
        screen: Estado,
        navigationOptions: {
            header: null,
        }
    },
    Servicio: {
        screen: Servicio,
        navigationOptions: {
            header: null,
        }
    },
    WebViews: {
        screen: WebViews,
        navigationOptions: {
            header: null,
        }
    }
}, {
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: {
        gesturesEnabled: false
    }
});

const Drawer = createDrawerNavigator({
    Home: {
        screen: CareerStack,
        navigationOptions: {
            header: null,
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null,
        }
    },
    Favorite: {
        screen: Favorite,
        navigationOptions: {
            header: null,
        }
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            header: null,
        }
    },
    Popular: {
        screen: Popular,
        navigationOptions: {
            header: null,
        }
    },
    Privacy: {
        screen: Privacy,
        navigationOptions: {
            header: null,
        }
    },
    About: {
        screen: About,
        navigationOptions: {
            header: null,
        }
    },
    Report: {
        screen: Report,
        navigationOptions: {
            header: null,
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            header: null,
        }
    },
}, {
    initialRouteName: 'Home',
    contentComponent: CustomDrawer,
    // drawerOpenRoute: 'DrawerOpen',
    // drawerCloseRoute: 'DrawerClose',
    // drawerToggleRoute: 'DrawerToggle'
});

// const Drawer = createDrawerNavigator({
//     Home: {
//         screen: Dashboard,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Profile: {
//         screen: Profile,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Favorite: {
//         screen: Favorite,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Notification: {
//         screen: Notification,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Popular: {
//         screen: Popular,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Privacy: {
//         screen: Privacy,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     About: {
//         screen: About,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Report: {
//         screen: Report,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Settings: {
//         screen: Settings,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Career: {
//         screen: Career,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Careers: {
//         screen: Careers,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     CourseDetails: {
//         screen: CourseDetails,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Filter: {
//         screen: Filter,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     State: {
//         screen: State,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     Service: {
//         screen: Service,
//         navigationOptions: {
//             header: null,
//         }
//     },
//     WebViews: {
//         screen: WebViews,
//         navigationOptions: {
//             header: null,
//         }
//     },
// }, {
//     initialRouteName: 'Home',
//     contentComponent: CustomDrawer,
//     // drawerOpenRoute: 'DrawerOpen',
//     // drawerCloseRoute: 'DrawerClose',
//     // drawerToggleRoute: 'DrawerToggle'
// });

class AuthLoading extends Component {
    componentDidMount = async () => {
        this.props.navigation.navigate("Route1");
    }
    render() {
        return (
            <View>
            </View>
        )
    }
}

const AppNavigator = createSwitchNavigator({
    AuthLoading: AuthLoading,
    Drawer: Drawer,
    Route1: Route1,
});

export default createAppContainer(AppNavigator);

//https://i.diawi.com/h8AB94    apk
//https://i.diawi.com/q9aSKG    ipa

