import { FC } from "react";
import { Document, Page, Text, View, StyleSheet, Line, Svg, Image, Rect} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    // borderWidth: 3,
    // borderTopColor: '#333399',
    // borderLeftColor: '#333399',
    // borderRightColor: '#FF3366',
    // borderBottomColor: '#FF3366',
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    position: 'relative'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  image_logo: {
    position: 'absolute',
    top: 25,
    left: 25,
    width: 97,
    height: 38
  },
  image_logo_check: {
    position: 'absolute',
    top: 25,
    right: 25,
    width: 66,
    height: 66
  },
  image_logo_qr_code: {
    position: 'absolute',
    top: 435,
    right: 25,
    width: 185,
    height: 185
  },
  image_logo_salesman: {
    position: 'absolute',
    top: 683,
    left: 43,
    width: 52,
    height: 52
  },
  image_logo_Lender: {
    position: 'absolute',
    top: 683,
    left: 223,
    width: 52,
    height: 52
  },
  image_logo_dmv: {
    position: 'absolute',
    top: 683,
    left: 403,
    width: 52,
    height: 52
  },
  image_logo_Lender1: {
    position: 'absolute',
    top: 697,
    left: 225,
    width: 49,
    height: 22
  },
  svg: {
    position: 'absolute',
    top: 15,
    left: 10
  },
  title: {
    fontSize: 30,
    fontWeight: 800,
  },
  text_content1: {
    fontSize: 12,
    fontWeight: 400,
  },
  text_content2: {
    fontSize: 14,
    fontWeight: 700,
  },
  text_content3: {
    fontSize: 20,
    fontWeight: 800,
  },
  text_content4: {
    fontSize: 18,
    fontWeight: 600,
  },
});
export const MyDocument: FC = () => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image
          style={styles.image_logo}
          src="/Logos.png"
        />
        <Image
          style={styles.image_logo_check}
          src="/group8878.png"
        />
        <Image
          style={styles.image_logo_qr_code}
          src="/qr_code_md.png"
        />
        <Image
          style={styles.image_logo_salesman}
          src="/user3_72.png"
        />
        <Image
          style={styles.image_logo_Lender}
          src="/capital_logo.png"
        />
        <Image
          style={styles.image_logo_dmv}
          src="/ca_dmv_x70.png"
        />
        <Image
          style={styles.image_logo_Lender1}
          src="/capital_logo1.png"
        />
        <Svg height="850" width="600" style={styles.svg}>
          <Line
            x1="0"
            y1="2.5"
            x2="575"
            y2="2.5"
            strokeWidth={5}
            stroke="#333399"
          />
          <Line
              x1="0"
              y1="810"
              x2="572.5"
              y2="807.5"
              strokeWidth={5}
              stroke="#FF3366"
            />
          <Line
            x1="2.5"
            y1="2.5"
            x2="2.5"
            y2="807.5"
            strokeWidth={5}
            stroke="#333399"
          />
          <Line
            x1="572.5"
            y1="5"
            x2="572.5"
            y2="810"
            strokeWidth={5}
            stroke="#FF3366"
          />
          <Text x="120" y="120" style={styles.title} fill="#333399">
            Electronic Title Certificate
          </Text>
          <Rect x="25" y="185" rx="6" ry="6" width="255" height="50" stroke="#4D4055" />
          <Text x="41" y="203" style={styles.text_content1} fill="#837A88">Vehicle Number</Text>
          <Text x="41" y="225" style={styles.text_content2} fill="#20102B">K72F40K72F40K712386</Text>
          <Rect x="290" y="185" rx="6" ry="6" width="130" height="50" stroke="#4D4055" />
          <Text x="306" y="203" style={styles.text_content1} fill="#837A88">Vehicle Type</Text>
          <Text x="306" y="225" style={styles.text_content1} fill="#20102B">Automobile</Text>
          <Rect x="430" y="185" rx="6" ry="6" width="125" height="50" stroke="#4D4055" />
          <Text x="446" y="203" style={styles.text_content1} fill="#837A88">Body Type Model</Text>
          <Text x="446" y="225" style={styles.text_content1} fill="#20102B">4D</Text>

          <Rect x="25" y="270" rx="6" ry="6" width="120" height="50" stroke="#4D4055" />
          <Text x="41" y="288" style={styles.text_content1} fill="#837A88">Year Model</Text>
          <Text x="41" y="310" style={styles.text_content1} fill="#20102B">2018</Text>
          <Rect x="155" y="270" rx="6" ry="6" width="85" height="50" stroke="#4D4055" />
          <Text x="173" y="288" style={styles.text_content1} fill="#837A88">Make</Text>
          <Text x="173" y="310" style={styles.text_content1} fill="#20102B">Jeep</Text>
          <Rect x="250" y="270" rx="6" ry="6" width="85" height="50" stroke="#4D4055" />
          <Text x="266" y="288" style={styles.text_content1} fill="#837A88">Model</Text>
          <Text x="266" y="310" style={styles.text_content1} fill="#20102B">Renegade</Text>
          <Rect x="345" y="270" rx="6" ry="6" width="210" height="50" stroke="#4D4055" />
          <Text x="361" y="288" style={styles.text_content1} fill="#837A88">Plate Number</Text>
          <Text x="361" y="310" style={styles.text_content1} fill="#20102B">7ABC123</Text>

          <Rect x="25" y="355" rx="6" ry="6" width="55" height="50" stroke="#4D4055" />
          <Text x="41" y="373" style={styles.text_content1} fill="#837A88">Class</Text>
          <Text x="41" y="395" style={styles.text_content1} fill="#20102B">04</Text>
          <Rect x="90" y="355" rx="6" ry="6" width="110" height="50" stroke="#4D4055" />
          <Text x="106" y="373" style={styles.text_content1} fill="#837A88">Trust Number</Text>
          <Text x="106" y="395" style={styles.text_content1} fill="#20102B">2100908</Text>
          <Rect x="210" y="355" rx="6" ry="6" width="150" height="50" stroke="#4D4055" />
          <Text x="226" y="373" style={styles.text_content1} fill="#837A88">Issue Date</Text>
          <Text x="226" y="395" style={styles.text_content1} fill="#20102B">08-17-2022</Text>
          <Rect x="370" y="355" rx="6" ry="6" width="185" height="50" stroke="#4D4055" />
          <Text x="386" y="373" style={styles.text_content1} fill="#837A88">Expiration Date</Text>
          <Text x="386" y="395" style={styles.text_content1} fill="#20102B">12-17-2022</Text>

          <Rect x="25" y="440" rx="6" ry="6" width="130" height="50" stroke="#4D4055" />
          <Text x="41" y="458" style={styles.text_content1} fill="#837A88">Registered Owners</Text>
          <Text x="41" y="480" style={styles.text_content2} fill="#20102B">Bob Smith</Text>
          <Rect x="165" y="440" rx="6" ry="6" width="195" height="50" stroke="#4D4055" />
          <Text x="181" y="458" style={styles.text_content1} fill="#837A88">Adress</Text>
          <Text x="181" y="480" style={styles.text_content2} fill="#20102B">1234 WINCHESTER AVE</Text>

          <Rect x="25" y="545" rx="6" ry="6" width="100" height="50" stroke="#4D4055" />
          <Text x="41" y="563" style={styles.text_content1} fill="#837A88">City</Text>
          <Text x="41" y="585" style={styles.text_content2} fill="#20102B">Sacramento</Text>
          <Rect x="135" y="545" rx="6" ry="6" width="90" height="50" stroke="#4D4055" />
          <Text x="151" y="563" style={styles.text_content1} fill="#837A88">State</Text>
          <Text x="151" y="585" style={styles.text_content2} fill="#20102B">California</Text>
          <Rect x="235" y="545" rx="6" ry="6" width="125" height="50" stroke="#4D4055" />
          <Text x="251" y="563" style={styles.text_content1} fill="#837A88">Fees Paid</Text>
          <Text x="251" y="585" style={styles.text_content1} fill="#20102B">21</Text>

          <Rect x="25" y="650" rx="12" ry="12" width="170" height="90" stroke="#DCDCDC" />
          <Text x="90" y="685" style={styles.text_content3} fill="#212133">Salesman</Text>
          <Text x="90" y="715" style={styles.text_content4} fill="#9B96B6">James M</Text>
          <Rect x="205" y="650" rx="12" ry="12" width="170" height="90" stroke="#DCDCDC" />
          <Text x="270" y="685" style={styles.text_content3} fill="#212133">Lender</Text>
          <Text x="270" y="715" style={styles.text_content4} fill="#9B96B6">Capital One</Text>
          <Rect x="385" y="650" rx="12" ry="12" width="170" height="90" stroke="#DCDCDC" />
          <Text x="450" y="685" style={styles.text_content3} fill="#212133">DMV</Text>
          <Text x="450" y="715" style={styles.text_content4} fill="#9B96B6">Los Angeles</Text>
        </Svg>
      </Page>
    </Document>
  );
};