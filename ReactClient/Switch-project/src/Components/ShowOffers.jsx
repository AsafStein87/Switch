import React, { useState, useEffect } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Select, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import dayjs from 'dayjs';
import Btn from '../Elements/Btn';
import '../StyleSheets/ShowOffers.css';
import Loader from './Loader';
import Chat from './Chat';
import { getCoordinatesFromZip } from '../Services/geocodeService';  // Import from services
import MapComponent from '../Components/MapComponent';


const wasteTypeImages = {
  'Plastic': [
    './Images/wasteTypes/plastic1.jpg',
    './Images/wasteTypes/plastic2.jpg',
    './Images/wasteTypes/plastic3.jpg',
    './Images/wasteTypes/plastic4.jpg',
    './Images/wasteTypes/plastic5.jpg',
    './Images/wasteTypes/plastic6.jpg',
    './Images/wasteTypes/plastic7.jpg',
    './Images/wasteTypes/plastic8.jpg',
  ],
  'Cardboard': [
    './Images/wasteTypes/cardboard1.jpg',
    './Images/wasteTypes/cardboard2.jpg',
    './Images/wasteTypes/cardboard3.jpg',
    './Images/wasteTypes/cardboard4.jpg',
    './Images/wasteTypes/cardboard5.jpg',
    './Images/wasteTypes/cardboard6.jpg',
    './Images/wasteTypes/cardboard7.jpg',
  ],
  'Paper': [
    './Images/wasteTypes/paper1.jpg',
    './Images/wasteTypes/paper2.jpg',
    './Images/wasteTypes/paper3.jpg',
    './Images/wasteTypes/paper4.jpg',
    './Images/wasteTypes/paper5.jpg',
    './Images/wasteTypes/paper6.jpg',
    './Images/wasteTypes/paper7.jpg',
    './Images/wasteTypes/paper8.jpg',
    './Images/wasteTypes/paper9.jpg',
    './Images/wasteTypes/paper10.jpg',
  ],
  'Wood': [
    './Images/wasteTypes/wood1.jpg',
    './Images/wasteTypes/wood2.jpg',
    './Images/wasteTypes/wood3.jpg',
    './Images/wasteTypes/wood4.jpg',
    './Images/wasteTypes/wood5.jpg',
    './Images/wasteTypes/wood6.jpg',
    './Images/wasteTypes/wood7.jpg',
    './Images/wasteTypes/wood8.jpg',
  ]
};

const wasteTypeMap = {
  'Plastic': 'פלסטיק',
  'Cardboard': 'קרטון',
  'Paper': 'נייר',
  'Wood': 'עץ'
};

const reverseWasteTypeMap = {
  'פלסטיק': 'Plastic',
  'קרטון': 'Cardboard',
  'נייר': 'Paper',
  'עץ': 'Wood'
};

const citiesInIsrael = [
  'אביבים', 'אביחיל', 'אבן יהודה', 'אבן מנחם', 'אבנת', 'אבשלום', 'אדורה', 'אדירים', 'אודים', 'אודם',
  'אוהד', 'אום אל-פחם', 'אופקים', 'אור עקיבא', 'אור יהודה', 'אורים', 'אורנים', 'אזור', 'אחוזם', 'אחיהוד',
  'אילון', 'אילות', 'אילניה', 'אליכין', 'אלעד', 'אלפי מנשה', 'אלקנה', 'אמונים', 'אמציה', 'אניעם',
  'אפרתה', 'אריאל', 'אשבול', 'אשדוד', 'אשקלון', 'באקה אל-גרביה', 'באר שבע', 'בארותיים', 'בארות יצחק', 'באר יעקב',
  'באר מילכה', 'בוסתן הגליל', 'בוקעאתא', 'בורגתה', 'בחן', 'בית אריה', 'בית גוברין', 'בית דגן', 'בית הלל', 'בית זיד',
  'בית זית', 'בית חורון', 'בית חנן', 'בית חנניה', 'בית חשמונאי', 'בית יהושע', 'בית ינאי', 'בית יצחק-שער חפר', 'בית שמש', 'בית שאן',
  'ביתר עילית', 'בני ברק', 'בני דרום', 'בני יהודה', 'בני עטרות', 'בני ציון', 'בני ראם', 'בנימינה-גבעת עדה', 'בנימינה', 'בסמ"ה',
  'בסמת טבעון', 'בר גיורא', 'בר יוחאי', 'ברעם', 'ברקאי', 'ברקן', 'ברקת', 'בת הדר', 'בת ים', 'בת שלמה',
  'גאולים', 'גאליה', 'גבולות', 'גבים', 'גבע כרמל', 'גבעה', 'גבעת אבני', 'גבעת אלה', 'גבעת ברנר', 'גבעת זאב',
  'גבעת חן', 'גבעת יואב', 'גבעת יערים', 'גבעת כח', 'גבעת ניל"י', 'גבעת עוז', 'גבעת שמואל', 'גבעת שפירא', 'גבעתי', 'גברעם',
  'גבת', 'גדות', 'גדיש', 'גדעונה', 'גדרה', 'גונן', 'גורן', 'גורנות הגליל', 'גזית', 'גזר',
  'גיאה', 'גיבתון', 'גיזו', 'גילת', 'גינוסר', 'גינתון', 'גלאון', 'גלעד (אבן יצחק)', 'גן הדרום', 'גן השומרון',
  'גן חיים', 'גן יאשיה', 'גן יבנה', 'גן נר', 'גן שלמה', 'גן שמואל', 'גנות', 'גני הדר', 'גני טל', 'גני יוחנן',
  'גני מודיעין', 'גני עם', 'גני תקווה', 'געש', 'געתון', 'גפן', 'גרופית', 'גשור', 'גשר', 'גשר הזיו',
  'גת (קיבוץ)', 'גת רימון', 'דאלית אל-כרמל', 'דבורה', 'דבוריה', 'דבירה', 'דברת', 'דגניה א\'', 'דגניה ב\'', 'דובב',
  'דולב', 'דור', 'דורות', 'דחי', 'דימונה', 'דישון', 'דליה', 'דלתון', 'דמיידה', 'דן',
  'דפנה', 'דקל', 'דרום השרון', 'דריג\'את', 'האון', 'הבונים', 'הגושרים', 'הדר עם', 'הדר גנים', 'הוד השרון',
  'הושעיה', 'הזורע', 'הזורעים', 'החותרים', 'היוגב', 'הילה', 'הר אדר', 'הר גילה', 'הר טוב', 'הר עמשא',
  'הרצליה', 'ורד יריחו', 'ורדון', 'זכרון יעקב', 'זיתן', 'זכריה', 'זמר', 'זמרת', 'זנוח', 'זרועה',
  'חבצלת השרון', 'חברון', 'חגור', 'חגלה', 'חדיד', 'חדנס', 'חדרה', 'חולון', 'חולית', 'חולתה',
  'חומש', 'חוסן', 'חופית', 'חוקוק', 'חורה', 'חורפיש', 'חורשים', 'חזון', 'חיבת ציון', 'חיננית',
  'חיפה', 'חירות', 'חלוץ', 'חמאם', 'חמד', 'חמדיה', 'חמרה', 'חניאל', 'חנתון', 'חספין',
  'חפץ חיים', 'חפציבה', 'חצבה', 'חצור הגלילית', 'חצור אשדוד', 'חצרים', 'חרב לאת', 'חרמש', 'חרשים', 'חשמונאים',
  'טבריה', 'טובא-זנגריה', 'טורעאן', 'טייבה', 'טירה', 'טירת כרמל', 'טירת צבי', 'טל שחר', 'טללים', 'טלמון',
  'טמרה', 'יבול', 'יבנאל', 'יבנה', 'יגל', 'יד בנימין', 'יד השמונה', 'יד חנה', 'יד מרדכי', 'יהוד-מונוסון',
  'יהל', 'יובלים', 'יודפת', 'יוטבתה', 'יונתן', 'יושיביה', 'יזרעאל', 'יחיעם', 'יטבתה', 'ייט"ב',
  'יכיני', 'ינון', 'ינוב', 'ינון', 'יסוד המעלה', 'יסעור', 'יעד', 'יעף', 'יערה', 'יפו',
  'יפית', 'יפתח', 'יצהר', 'יציץ', 'יקיר', 'יראון', 'ירושלים', 'ירחיב', 'ירכא', 'ירקונה',
  'ישע', 'ישעי', 'ישרש', 'יתד', 'יתיר', 'כברי', 'כדורי', 'כדים', 'כוכב השחר', 'כוכב יאיר',
  'כוכב מיכאל', 'כורזים', 'כחל', 'כיסופים', 'כישור', 'כיסופים', 'כליל', 'כלניות', 'כמון', 'כנות',
  'כסלון', 'כסרא-סמיע', 'כעביה-טבאש', 'כפר אביב', 'כפר אדומים', 'כפר אוריה', 'כפר ורדים', 'כפר ורבורג', 'כפר חב"ד', 'כפר הנוער ימין אורד',
  'כפר הנשיא', 'כפר הס', 'כפר ויתקין', 'כפר ורבורג', 'כפר גלעדי', 'כפר דניאל', 'כפר ורבורג', 'כפר ויתקין', 'כפר חב"ד', 'כפר הס',
  'כפר הרוא"ה', 'כפר הרי"ף', 'כפר הס', 'כפר ורבורג', 'כפר ורבורג', 'כפר הנוער ימין אורד', 'כפר הנוער מנחם בגין', 'כפר ידידיה', 'כפר יונה', 'כפר יעבץ',
  'כפר כמא', 'כפר כנא', 'כפר מנדא', 'כפר מסריק', 'כפר סאלד', 'כפר סבא', 'כפר סילבר', 'כפר סירקין', 'כפר עבודה', 'כפר עציון',
  'כפר פינס', 'כפר קאסם', 'כפר קיש', 'כפר קמה', 'כפר קאסם', 'כפר קרע', 'כפר רוזנואלד', 'כפר רופין', 'כפר שמואל', 'כפר תבור',
  'כפר תפוח', 'כרמי יוסף', 'כרמי צור', 'כרמיאל', 'כרמייה', 'כרמים', 'כרמל', 'לבון', 'לביא', 'להבים',
  'לוד', 'לוזית', 'לוחמי הגטאות', 'לוטם', 'לוטן', 'לימן', 'לכיש', 'לפיד', 'לפידות', 'לקיה',
  'מאור', 'מאיר שפיה', 'מבוא חורון', 'מבוא חמה', 'מבוא מודיעים', 'מבועים', 'מבטחים', 'מבקיעים', 'מגדל', 'מגדל העמק',
  'מגן', 'מגן שאול', 'מגידו', 'מגל', 'מגן', 'מגשימים', 'מדרך עוז', 'מדרשת בן-גוריון', 'מודיעין עילית', 'מודיעין-מכבים-רעות',
  'מולדת', 'מזכרת בתיה', 'מחולה', 'מחניים', 'מחסיה', 'מטולה', 'מיצר', 'מירב', 'מירון', 'מישר',
  'מכורה', 'מכמורת', 'מכמש', 'מנוחה', 'מנחמיה', 'מנרה', 'מנסורה', 'מנשית זבדה', 'מסד', 'מסדה',
  'מסילות', 'מעברות', 'מעגלים', 'מעגן', 'מעגן מיכאל', 'מעוז חיים', 'מעון', 'מעונה', 'מעלה אדומים', 'מעלה אפרים',
  'מעלה גלבוע', 'מעלה גמלא', 'מעלה החמישה', 'מעלה לבונה', 'מעלה מכמש', 'מעלה עוז', 'מעלות תרשיחא', 'מעש', 'מצדות יהודה', 'מצפה רמון',
  'מרגליות', 'מרום גולן', 'מרחב עם', 'מרחביה (מושב)', 'מרחביה (קיבוץ)', 'מרכז שפירא', 'משאבי שדה', 'משגב דב', 'משואה', 'משאבי שדה',
  'משמר איילון', 'משמר דוד', 'משמר הנגב', 'משמר העמק', 'משמר הירדן', 'משמר השרון', 'משמר השבעה', 'משמרות', 'משען', 'מתן',
  'מתת', 'נאות גולן', 'נאות הכיכר', 'נאות מרדכי', 'נבטים', 'נגוהות', 'נגבה', 'נגיד', 'נהורה', 'נהלל',
  'נחלים', 'נחף', 'נחשולים', 'נחשון', 'נחשונים', 'נטועה', 'נטעים', 'נטף', 'ניל"י', 'ניסנית',
  'ניצן', 'ניצנה', 'ניצני סיני', 'ניצני עוז', 'ניצנים', 'ניר בנים', 'ניר גלים', 'ניר דוד (תל עמל)', 'ניר ח"ן', 'ניר יפה',
  'ניר יצחק', 'ניר ישראל', 'ניר משה', 'ניר עוז', 'ניר עקיבא', 'ניר עציון', 'ניר צבי', 'נירים', 'נירית', 'נירן',
  'נס הרים', 'נס עמים', 'נס ציונה', 'נעורה', 'נעמ"ה', 'נען', 'נעלה', 'נעמה', 'נען', 'נערן',
  'נר גלים', 'נריה', 'נתיב הגדוד', 'נתיב הל"ה', 'נתיב העשרה', 'נתיב השיירה', 'נתיבות', 'נתניה', 'סאג\'ור', 'סאסא',
  'סביון', 'סגולה', 'סולם', 'סוסיה', 'סופה', 'סח\'נין', 'סלמה', 'סלעית', 'סמר', 'סנסנה',
  'סעד', 'סעווה', 'סער', 'סער', 'ספיר', 'עבדון', 'עברון', 'עגור', 'עדנים', 'עוזה',
  'עוזייר', 'עולש', 'עומר', 'עופר', 'עופרה', 'עוצם', 'עזוז', 'עזריה', 'עזריאל', 'עזריאל',
  'עזריקם', 'עטרות', 'עטרות', 'עיינות', 'עין איילה', 'עין אל-אסד', 'עין גב', 'עין גדי', 'עין דור', 'עין הבשור',
  'עין הוד', 'עין המפרץ', 'עין העמק', 'עין השופט', 'עין השופט', 'עין החורש', 'עין העמק', 'עין השלושה', 'עין כרם', 'עין כרמל',
  'עין עירון', 'עין שמר', 'עין שריד', 'עין תמר', 'עיינות', 'עילבון', 'עילוט', 'עין עוז', 'עין צורים', 'עין שמר',
  'עין תמר', 'עכו', 'עץ אפרים', 'עשרת', 'עתלית', 'פארן', 'פדויים', 'פדיה', 'פוריידיס', 'פוריה',
  'פוריה נווה עובד', 'פורת', 'פטיש', 'פלמחים', 'פני חבר', 'פסוטה', 'פעמי תש"ז', 'פצאל', 'פקיעין', 'פרדס חנה-כרכור',
  'פרדסיה', 'פרי גן', 'פרידיס', 'פתח תקווה', 'פתח תקווה', 'פתחיה', 'צובה', 'צוחר', 'צופים', 'צופיה',
  'צור הדסה', 'צור יצחק', 'צור משה', 'צור נתן', 'צור עזה', 'צור צבי', 'צוריאל', 'צפת', 'צרופה', 'צרעה',
  'קדומים', 'קדמה', 'קדמת צבי', 'קדר', 'קדרון', 'קודיירה', 'קוממיות', 'קצרין', 'קצרין', 'קרית ארבע',
  'קרית אתא', 'קרית ביאליק', 'קרית גת', 'קרית חינוך', 'קרית חיים', 'קרית טבעון', 'קרית ים', 'קרית יערים', 'קרית מוצקין', 'קרית מלאכי',
  'קרית עקרון', 'קרית שמונה', 'ראמה', 'ראס אל-עמוד', 'ראס אל-עין', 'ראש העין', 'ראש פינה', 'ראש צורים', 'ראשון לציון', 'רבדים',
  'רביבים', 'רביד', 'רגבה', 'רגבים', 'רהט', 'רווחה', 'רוויה', 'רוחמה', 'רועי', 'רחוב',
  'רחובות', 'רחלים', 'ריחאניה', 'רימונים', 'רינתיה', 'רכסים', 'רמלה', 'רמת גן', 'רמת יוחנן', 'רמת ישי',
  'רמת השרון', 'רמת רזיאל', 'רמת מגשימים', 'רמת צבי', 'רמלים', 'רמת שלמה', 'רמלה', 'רמת שלמה', 'רמת רחל', 'רעננה',
  'רשפון', 'רשפים', 'רתמים', 'שאר ישוב', 'שבי דרום', 'שבי ציון', 'שבי שומרון', 'שגב שלום', 'שדה אליהו', 'שדה בוקר',
  'שדה דוד', 'שדה אילן', 'שדה אליעזר', 'שדה ורבורג', 'שדה חמד', 'שדה ניצן', 'שדה נחום', 'שדה עוזיהו', 'שדה צבי', 'שדה תרומות',
  'שדי תרומות', 'שדי חמד', 'שדי יעקב', 'שדי תרומות', 'שדרות', 'שוהם', 'שומרה', 'שוקדה', 'שורש', 'שושנת עכו',
  'שושנת עכו', 'שילת', 'שלוחות', 'שלומי', 'שלומציון', 'שמיר', 'שמעה', 'שמשית', 'שניר',
  'שעב', 'שער אפרים', 'שער הגולן', 'שער חפר', 'שער מנשה', 'שערי תקווה', 'שפיים', 'שפיר', 'שפרעם', 'שקד',
  'שקף', 'שתי קנים', 'שתולה', 'שילה', 'שילת', 'שילת', 'שקף', 'תומר', 'תימורים', 'תירוש',
  'תל אביב-יפו', 'תל יוסף', 'תל מונד', 'תל עדשים', 'תל קציר', 'תל שבע', 'תלם', 'תמרת', 'תענך', 'תפרח',
  'תקוע', 'תמרת'
];


export default function ShowOffers() {
  const [offers, setOffers] = useState([]);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chatOfferId, setChatOfferId] = useState(null);
  const [factoryAddress, setChatFactoryAddress] = useState(null);
  const [factoryCode, setFactoryCode] = useState(null);
  const [wasteTypeFilter, setWasteTypeFilter] = useState('');
  const [amountFilter, setAmountFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [offerImages, setOfferImages] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [factoryNames, setFactoryNames] = useState({});
  const [factoryCodeToName, setFacetoryToNameAndNumber] = useState(new Map());
  const [factoryName, setFactoryName] = useState(''); // Define factoryName state



  useEffect(() => {
    // Retrieve factoryName from localStorage
    const storedFactoryName = localStorage.getItem('factoryName');
    if (storedFactoryName) {
      setFactoryName(storedFactoryName);
    }
    getAllOffers();
    loadFavorites();
  }, []);
  
  const getAllOffers = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://proj.ruppin.ac.il/bgroup34/test2/tar1/api/ViewAllOffers/GetAllOffers");
      const result = await response.json();
      const filtered = result.filter(offer => dayjs(offer.endDate).isAfter(dayjs()));
      console.log(filtered, result);
  
      // Fetch factory names concurrently for valid factory codes
      await Promise.all(filtered
        .filter(offer => offer.factoryCode) // Ensure factoryCode is not null
        .map(offer => fetchFactoryName(offer.factoryCode)));
  
      // Set images
      const initialOfferImages = {};
      filtered.forEach(offer => {
        initialOfferImages[offer.offerCode] = getRandomImage(offer.offerType);
      });
      setOffers(filtered);
      setFilteredOffers(filtered);
      setOfferImages(initialOfferImages);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleTakeDownOffer = async (offerId, myFactoryName) => {
    try {
      const response = await fetch(`http://proj.ruppin.ac.il/bgroup34/test2/tar1/api/ViewAllOffers/DeleteOffer?offerId=${offerId}&userFactoryName=${myFactoryName}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setOffers((prevOffers) => prevOffers.filter((offer) => offer.offerCode !== offerId));
        setFilteredOffers((prevOffers) => prevOffers.filter((offer) => offer.offerCode !== offerId));
        setDialogMessage("ההצעה נמחקה בהצלחה");
        setDialogOpen(true);
      } else {
        const errorText = await response.text(); // Capture any error message from the backend
        console.error('Failed to delete offer:', response.status, response.statusText, errorText);
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
    }
  };
  


  const fetchFactoryName = async (factoryCode) => {
    if (!factoryCode) {
      console.error('Factory code is null or undefined');
      return;
    }
  
    console.log(`Fetching factory name for code: ${factoryCode}`); // Debug log
    try {
      const response = await fetch(`http://proj.ruppin.ac.il/bgroup34/test2/tar1/api/ViewAllOffers/GetFactoryName?factoryCode=${factoryCode}`);
      if (response.ok) {
        const factoryName = await response.text();
        console.log(`Factory Code: ${factoryCode}, Factory Name: ${factoryName}`); // Log the response

        setFactoryNames(prevNames => ({
          ...prevNames,
          [factoryCode]: factoryName
        }));

        setFacetoryToNameAndNumber((prevMap) => new Map(prevMap).set(factoryName, factoryCode));

      } else {
        console.error(`Failed to fetch factory name for code: ${factoryCode}`);
      }
    } catch (error) {
      console.error(`Error fetching factory name for code: ${factoryCode}`, error);
    }
  };
  
  

  const loadFavorites = () => {
    const userLogIn = localStorage.getItem("factoryName");
    if (!userLogIn) {
      console.error('User is not logged in');
      return;
    }
    
    const favoritesKey = `favorites ${userLogIn}`;
    const storedFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    setFavorites(storedFavorites);
  };

  
  useEffect(() => {
    getAllOffers();
    loadFavorites();
  }, []);

  useEffect(() => {
    console.log('Factory Names:', factoryNames);
  }, [factoryNames]);
  

  const handleFilter = () => {
    const filtered = offers.filter(offer => {
      const matchesWasteType = wasteTypeFilter ? offer.offerType === reverseWasteTypeMap[wasteTypeFilter] : true;
      const matchesAmount = amountFilter ? parseFloat(offer.quantity.replace(/[^\d.-]/g, '')) >= parseFloat(amountFilter) : true;
      const matchesLocation = locationFilter ? offer.factoryAddress.includes(locationFilter) : true;
      return matchesWasteType && matchesAmount && matchesLocation;
    });
    setFilteredOffers(filtered);
  };

  const addToFavorites = (offer) => {
    const userLogIn = localStorage.getItem('factoryName');
    if (!userLogIn) {
      console.error('User is not logged in');
      return;
    }
  
    const favoritesKey = `favorites_${userLogIn}`;
    const currentFavorites = JSON.parse(localStorage.getItem(favoritesKey)) || [];
    
    // Use the factoryNames state to get the factory name
    const factoryName = factoryNames[offer.factoryCode] || 'מפעל';
  
    const offerWithFactoryName = { ...offer, factoryName };
  
    const offerExists = currentFavorites.some(fav => fav.offerCode === offer.offerCode);
  
    if (!offerExists) {
      const updatedFavorites = [...currentFavorites, offerWithFactoryName];
      localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      setDialogMessage("!נוסף בהצלחה למועדפים");
      setDialogOpen(true);
    } else {
      console.log("Offer already in favorites.");
      setDialogMessage("ההצעה כבר במועדפים");
      setDialogOpen(true);
    }
  };
  
  

  const openChat = (offerId, factoryAddress, factoryCode) => {
    setChatOfferId(offerId);
    setChatFactoryAddress(factoryAddress);
    setFactoryCode(factoryCode);
  };

  const closeChat = () => {
    setChatOfferId(null);
    setChatFactoryAddress(null);
    setFactoryCode(null);

  };

  const getRandomImage = (wasteType) => {
    const images = wasteTypeImages[wasteType];
    if (!images) {
      return './Images/wasteTypes/defaultPic.jpg'; // Use a default image if wasteType is not found
    }
    return images[Math.floor(Math.random() * images.length)];
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };


  return (
    <div className="offer-container">
      <h1 className="offer-title">הצעות לפינוי</h1>
      <div className="filter-container">
        <div className="filter-form">
          <Btn variant="contained" onClick={handleFilter}>סנן</Btn>
          <FormControl sx={{ minWidth: 200, marginRight: '10px' }}>
            <InputLabel id="waste-type-label"></InputLabel>
            <Select
              labelId="waste-type-label"
              value={wasteTypeFilter}
              onChange={(e) => setWasteTypeFilter(e.target.value)}
              displayEmpty
              sx={{ bgcolor: '#f5f5f5', marginLeft: '10px' }}
            >
              <MenuItem sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }} value=""><em>הכל</em></MenuItem>
              {Object.keys(wasteTypeMap).map(key => (
                <MenuItem sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={key} value={wasteTypeMap[key]}>
                  {wasteTypeMap[key]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="כמות מינימלית (kg)"
            type="number"
            value={amountFilter}
            onChange={(e) => setAmountFilter(e.target.value)}
            sx={{ marginRight: '10px', direction:'rtl' }}
          />
          <FormControl sx={{ minWidth: 200, marginRight: '10px' }}>
            <InputLabel id="location-label"></InputLabel>
            <Select
              labelId="location-label"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              displayEmpty
              sx={{ bgcolor: '#f5f5f5', marginLeft: '10px' }}
            >
              <MenuItem sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }} value=""><em>הכל</em></MenuItem>
              {citiesInIsrael.map(city => (
                <MenuItem sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' }} key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      {loading && <Loader />}
      <div className="card-container">
        {filteredOffers.map((offer, index) => (
          <Card key={index} className="card"
          style={{
            border: factoryNames[offer.factoryCode] === factoryName ? '5px solid #63b4c4' : 'none'
          }}
          >
            <CardMedia
              className="card-media"
              component="img"
              height="140"
              image={offerImages[offer.offerCode] || getRandomImage(offer.offerType)}
              alt="Offer Image"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
  {factoryNames[offer.factoryCode] || 'מפעל'}
</Typography>

              <Typography variant="body2" color="text.secondary">
                סוג הצעה: {wasteTypeMap[offer.offerType] || offer.offerType}<br />
                כמות: {offer.quantity}<br />
                כתובת: {offer.factoryAddress}<br />
                תאריך התחלה: {dayjs(offer.startDate).format('YYYY-MM-DD')}<br />
                תאריך סיום: {dayjs(offer.endDate).format('YYYY-MM-DD')}<br />
                תיאור: {offer.description}<br />
                המלצת קבלן: {offer.contractorRecommend}
              </Typography>
            </CardContent>
            <CardActions className="card-actions">
            {factoryNames[offer.factoryCode] === factoryName && (
                <Btn
                size="small"
                className="btn-small-red"
                onClick={() => handleTakeDownOffer(offer.offerCode, localStorage["factoryName"])}
              >
                הסר הצעה
              </Btn>
              
              )}
 {factoryNames[offer.factoryCode] !== factoryName && (
        <Btn size="small" onClick={() => addToFavorites(offer)}>הוספה למועדפים</Btn>
      )}              
{!(factoryNames[offer.factoryCode] === factoryName) && (
  <Btn size="small" onClick={() => openChat(offer.offerCode, offer.factoryAddress, offer.factoryCode)}>
    שלח הודעה
  </Btn>
)}
               
            </CardActions>
          </Card>
        ))}
      </div>
      {chatOfferId !== null && (
        <Chat offerId={chatOfferId} factoryCodeGiven={factoryCode} closeChat={closeChat} offerSender={true} from={0} />
      )}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ direction: 'rtl' }}>הודעה</DialogTitle>
        <DialogContent>
          <Typography>{dialogMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>סגור</Button>
        </DialogActions>
      </Dialog>
      {/* <MapComponent zipCodes={filteredOffers.map(offer => offer.zipCode)} /> */}

    </div>
  );
}
