import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Apptheme} from '../../../../config/Colors';
import DepartmentIcon from '../../../../assets/icons/DepartmentIcon.svg'
import PateintHistory from '../../../../assets/icons/PateintHistory';
import Fontisto from 'react-native-vector-icons/Fontisto'
import DoctorS from '../../../../assets/icons/DoctorS.svg'
import { normalizeSize } from '../../../../utility';
export const page_list_arr = [
  [
    {
      pageName: 'Clinic Profile',
      icon: <Fontisto name={'doctor'} color={Apptheme} />,
      navigate: 'ClicnicProfile',
      cms:false
    },
    {
      pageName: 'Disabled Doctor',
      icon: <DoctorS height={normalizeSize(10)}/>,
      navigate: 'DisableDoctor',
      cms:false

    },

    {
      pageName: 'Disabled Clinic',
      icon: <Fontisto name={'paralysis-disability'} color={Apptheme} />,
      navigate: 'DisabledClinic',
      cms:false

    },

    {
      pageName: 'Notification',
      icon: <Feather name={'bell'} color={Apptheme} />,
      navigate: 'Notification',
      cms:false

    },
  ],
  [
    {
      pageName: 'QR Code',
      icon: <AntDesign name={'qrcode'} color={Apptheme} />,
      navigate: 'QrCode',
      cms:false

    },
    {
      pageName: 'Department',
      icon: <DepartmentIcon/>,
      navigate: 'Department',
      cms:false

    },

    {
      pageName: 'Patient history',
      icon: <PateintHistory/>,
      navigate: 'PatientHistory',
      cms:false

    },
  ],
  [
    {
      pageName: 'About Us',
      icon: <AntDesign name={'infocirlceo'} color={Apptheme} />,
      navigate: 'AboutUs',
      cms:true

    },
    {
      pageName: 'FAQ',
      icon: <AntDesign name={'question'} color={Apptheme} />,
      navigate: '',
      cms:true
    },
    {
      pageName: 'Contact Us',
      icon: <Feather name={'phone-call'} color={Apptheme} />,
      navigate: 'ContactUs',
      cms:true
    },
  ],
  [
    {
      pageName: 'Terms and Condition',
      icon: <Foundation name={'clipboard-notes'} color={Apptheme} size={normalizeSize(12) }/>,
      navigate: 'TermsCondtion',
      cms:true
    },
    {
      pageName: 'Privacy Policy',
      icon: <AntDesign name={'filetext1'} color={Apptheme} />,
      navigate: 'PrivacyPolicy',
      cms:true
    },

    {
      pageName: 'Refund Policy',
      icon: <MaterialIcons name={'privacy-tip'} color={Apptheme} />,
      navigate: 'RefundPolicy',
      cms:true
    },
  ],
  //  ContactUs PrivacyPolicy  TermsCondtion
  [
    {
      pageName: 'Log out',
      icon: <AntDesign name={'poweroff'} color={'#DB4437'} />,
      navigate: '',
    },
  ],
];
