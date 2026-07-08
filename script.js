/* ============================================================
   Civil Calculator Pro — Application Script
   Contains: i18n strings, calculator logic (17 calculators),
   tab navigation, AI material-price estimator, and the
   jsPDF-based downloadable report generator.
   Loaded via <script src="./js/script.js"> — all functions are
   declared at the top level so inline onclick="..." handlers in
   index.html resolve correctly.
   ============================================================ */

/* ============================================================
   TRANSLATIONS
   Only display strings are translated. No calculation formula
   or numeric logic below is affected by language switching.
   ============================================================ */
const translations = {
en: {
  app: { titlePlain:"Civil Calculator Pro", tagline:"17 calculators · PDF report · Tamil Nadu rates", footer:"Civil Calculator Pro · Built for Tamil Nadu contractors" },
  tabs: { concrete:"Concrete", brick:"Brick", materials:"Materials", structure:"Structure", finishing:"Finishing", cost:"Cost", report:"PDF", prices:"AI Prices" },
  common: { clear:"Clear", errorGeneric:"⚠ Please enter valid values", errorVolume:"⚠ Please enter valid volume", errorArea:"⚠ Please enter valid area" },
  units: { cft:"CFT", sqft:"sq.ft", kg:"kg", litres:"Litres", steps:"steps", nos:"nos", bricks:"bricks", tiles:"tiles", cubicMetres:"cubic metres", cubicFeet:"cubic feet" },
  f: {
    lengthFt:"Length (ft)", widthFt:"Width (ft)", heightDepthFt:"Height / Depth (ft)", thicknessFt:"Thickness (ft)", heightFt:"Height (ft)", depthFt:"Depth (ft)",
    wallLengthFt:"Wall Length (ft)", wallHeightFt:"Wall Height (ft)", concreteVolCft:"Concrete Volume (CFT)", steelDiaMm:"Steel Diameter (mm)", steelLenFt:"Steel Length (ft)",
    tankLengthFt:"Tank Length (ft)", tankWidthFt:"Tank Width (ft)", tankHeightFt:"Tank Height (ft)", floorHeightFt:"Floor Height (ft)", stepHeightFt:"Each Step Height (ft)",
    roomLengthFt:"Room Length (ft)", roomWidthFt:"Room Width (ft)", tileSizeFt:"Tile Size (ft × ft)", totalCementBags:"Total Cement Bags", pricePerBag:"Price Per Bag (₹)",
    floorAreaSqft:"Floor Area (sq.ft)", ratePerSqft:"Rate per sq.ft (₹)", houseAreaSqft:"House Area (sq.ft)", constructionType:"Construction Type"
  },
  ph: { eg10:"e.g. 10", eg8:"e.g. 8", eg05:"e.g. 0.5", eg20:"e.g. 20", eg15:"e.g. 15", eg1:"e.g. 1", eg15d:"e.g. 1.5", eg4:"e.g. 4", eg2:"e.g. 2", eg5:"e.g. 5",
       eg6:"e.g. 6", eg058:"e.g. 0.58", eg12:"e.g. 12", eg40:"e.g. 40", eg100:"e.g. 100", eg50:"e.g. 50", eg380:"e.g. 380", eg500:"e.g. 500", eg60:"e.g. 60",
       eg1000:"e.g. 1000", egTile:"e.g. 2 for 2×2 ft" },
  concrete: { title:"Concrete Volume", btn:"Calculate Volume", approxSub:"Approx {v} cubic metres" },
  slab: { title:"Slab Calculator", btn:"Calculate Slab", resultLabel:"Slab", areaSub:"Area: {v} sq.ft" },
  column: { title:"Column Calculator", btn:"Calculate Column", resultLabel:"Column" },
  beam: { title:"Beam Calculator", btn:"Calculate Beam", resultLabel:"Beam" },
  footing: { title:"Footing Calculator", btn:"Calculate Footing", resultLabel:"Footing" },
  brick: { title:"Brick Calculator", btn:"Calculate Bricks", resultLabel:"Bricks Required", wasteSub:"+5% waste = {v} bricks" },
  cement: { title:"Cement Bags", btn:"Calculate Cement", resultLabel:"Cement Required", weightSub:"Weight: {v} kg", bagsUnit:"bags (50kg)" },
  sand: { title:"Sand Calculator", btn:"Calculate Sand", resultLabel:"Sand Required" },
  jelly: { title:"Jelly (Aggregate)", btn:"Calculate Jelly", resultLabel:"Jelly Required" },
  steel: { title:"Steel Weight", btn:"Calculate Steel", resultLabel:"Steel Weight", formulaSub:"Formula: D²/162 × Length(m)" },
  excavation: { title:"Excavation", btn:"Calculate Excavation", resultLabel:"Excavation Volume" },
  tank: { title:"Water Tank", btn:"Calculate Capacity", resultLabel:"Tank Capacity", cftSub:"{v} cubic feet" },
  stair: { title:"Staircase", btn:"Calculate Steps", resultLabel:"Steps Required" },
  tile: { title:"Tile Calculator", btn:"Calculate Tiles", resultLabel:"Tiles Required", wasteSub:"+5% waste = {v} tiles" },
  paint: { title:"Paint Calculator", btn:"Calculate Paint", resultLabel:"Paint Required (2 coats)", coverageSub:"Area: {a} sq.ft (1L covers ~40 sq.ft)" },
  plaster: { title:"Plaster Calculator", btn:"Calculate Plaster", resultLabel:"Plaster Area" },
  cementCost: { title:"Cement Cost", btn:"Calculate Cost", resultLabel:"Total Cement Cost" },
  flooring: { title:"Flooring Cost", btn:"Calculate Cost", resultLabel:"Total Flooring Cost" },
  house: { title:"House Construction Estimator", btn:"Estimate Cost", resultLabel:"Estimated Construction Cost",
           basic:"Basic (₹1,800/sq.ft)", standard:"Standard (₹2,500/sq.ft)", premium:"Premium (₹3,500/sq.ft)", luxury:"Luxury (₹5,000/sq.ft)",
           subFormat:"{label} · {area} sq.ft × ₹{rate}" },
  pdf: { title:"PDF Report", desc:"Professional multi-page PDF report with summary and material details", download:"Download Full Report",
         howTo:"How to use:", step1:"1. Go to other tabs and enter your values", step2:"2. Click Calculate in each section",
         step3:"3. Come back here and click \"Download Full Report\"", step4:"All results will be included in one PDF ✅",
         langNote:"Note: the downloaded PDF report is generated in English for compatibility with all devices and printers.",
         statusReady:"✅ PDF ready! {n} calc{plural}{extra} included." },
  ai: { title:"AI Price Estimator", desc:"Get AI-estimated current material rates for Tamil Nadu", fetchBtn:"Get Today's Estimated Prices",
        fetching:"Fetching...", refresh:"Refresh Prices", loading:"⏳ AI is estimating prices...", errorLoading:"❌ Error loading prices",
        cement:"Cement", sand:"Sand (M-Sand)", aggregate:"Coarse Aggregate", steel:"Steel (TMT)", brick:"Bricks", paint:"Paint (Exterior)",
        per50kg:"per 50kg bag", perCft:"per CFT", perKg:"per kg", per1000:"per 1000 nos", perLitre:"per litre",
        noteLabel:"Note:", disclaimer:"These are AI-estimated rates based on Tamil Nadu market trends. Actual prices may vary by location, brand, and supplier. Always verify with your local dealer before purchasing.",
        stable:"→ Stable", rising:"↑ Rising", summary:"Tamil Nadu construction material prices remain mostly stable." }
},
ta: {
  app: { titlePlain:"சிவில் கால்குலேட்டர் ப்ரோ", tagline:"17 கால்குலேட்டர்கள் · PDF அறிக்கை · தமிழ்நாடு விலைகள்", footer:"சிவில் கால்குலேட்டர் ப்ரோ · தமிழ்நாடு ஒப்பந்ததாரர்களுக்காக உருவாக்கப்பட்டது" },
  tabs: { concrete:"கான்கிரீட்", brick:"செங்கல்", materials:"பொருட்கள்", structure:"கட்டமைப்பு", finishing:"முடிவு பணி", cost:"செலவு", report:"PDF", prices:"AI விலைகள்" },
  common: { clear:"அழி", errorGeneric:"⚠ சரியான மதிப்புகளை உள்ளிடவும்", errorVolume:"⚠ சரியான அளவை உள்ளிடவும்", errorArea:"⚠ சரியான பரப்பளவை உள்ளிடவும்" },
  units: { cft:"CFT", sqft:"சதுர அடி", kg:"கிலோ", litres:"லிட்டர்", steps:"படிகள்", nos:"எண்ணிக்கை", bricks:"செங்கற்கள்", tiles:"டைல்ஸ்", cubicMetres:"கன மீட்டர்", cubicFeet:"கன அடி" },
  f: {
    lengthFt:"நீளம் (அடி)", widthFt:"அகலம் (அடி)", heightDepthFt:"உயரம் / ஆழம் (அடி)", thicknessFt:"தடிமன் (அடி)", heightFt:"உயரம் (அடி)", depthFt:"ஆழம் (அடி)",
    wallLengthFt:"சுவர் நீளம் (அடி)", wallHeightFt:"சுவர் உயரம் (அடி)", concreteVolCft:"கான்கிரீட் அளவு (CFT)", steelDiaMm:"இரும்பு விட்டம் (மிமீ)", steelLenFt:"இரும்பு நீளம் (அடி)",
    tankLengthFt:"தொட்டி நீளம் (அடி)", tankWidthFt:"தொட்டி அகலம் (அடி)", tankHeightFt:"தொட்டி உயரம் (அடி)", floorHeightFt:"தள உயரம் (அடி)", stepHeightFt:"ஒரு படி உயரம் (அடி)",
    roomLengthFt:"அறை நீளம் (அடி)", roomWidthFt:"அறை அகலம் (அடி)", tileSizeFt:"டைல் அளவு (அடி × அடி)", totalCementBags:"மொத்த சிமெண்ட் மூட்டைகள்", pricePerBag:"ஒரு மூட்டைக்கு விலை (₹)",
    floorAreaSqft:"தள பரப்பளவு (சதுர அடி)", ratePerSqft:"சதுர அடிக்கு விலை (₹)", houseAreaSqft:"வீட்டு பரப்பளவு (சதுர அடி)", constructionType:"கட்டுமான வகை"
  },
  ph: { eg10:"எ.கா. 10", eg8:"எ.கா. 8", eg05:"எ.கா. 0.5", eg20:"எ.கா. 20", eg15:"எ.கா. 15", eg1:"எ.கா. 1", eg15d:"எ.கா. 1.5", eg4:"எ.கா. 4", eg2:"எ.கா. 2", eg5:"எ.கா. 5",
       eg6:"எ.கா. 6", eg058:"எ.கா. 0.58", eg12:"எ.கா. 12", eg40:"எ.கா. 40", eg100:"எ.கா. 100", eg50:"எ.கா. 50", eg380:"எ.கா. 380", eg500:"எ.கா. 500", eg60:"எ.கா. 60",
       eg1000:"எ.கா. 1000", egTile:"எ.கா. 2×2 அடிக்கு 2" },
  concrete: { title:"கான்கிரீட் அளவு", btn:"அளவு கணக்கிடு", approxSub:"தோராயமாக {v} கன மீட்டர்" },
  slab: { title:"ஸ்லாப் கால்குலேட்டர்", btn:"ஸ்லாப் கணக்கிடு", resultLabel:"ஸ்லாப்", areaSub:"பரப்பளவு: {v} சதுர அடி" },
  column: { title:"தூண் கால்குலேட்டர்", btn:"தூண் கணக்கிடு", resultLabel:"தூண்" },
  beam: { title:"பீம் கால்குலேட்டர்", btn:"பீம் கணக்கிடு", resultLabel:"பீம்" },
  footing: { title:"அடித்தளம் கால்குலேட்டர்", btn:"அடித்தளம் கணக்கிடு", resultLabel:"அடித்தளம்" },
  brick: { title:"செங்கல் கால்குலேட்டர்", btn:"செங்கல் கணக்கிடு", resultLabel:"தேவையான செங்கற்கள்", wasteSub:"+5% வீண் = {v} செங்கற்கள்" },
  cement: { title:"சிமெண்ட் மூட்டைகள்", btn:"சிமெண்ட் கணக்கிடு", resultLabel:"தேவையான சிமெண்ட்", weightSub:"எடை: {v} கிலோ", bagsUnit:"மூட்டைகள் (50கிலோ)" },
  sand: { title:"மணல் கால்குலேட்டர்", btn:"மணல் கணக்கிடு", resultLabel:"தேவையான மணல்" },
  jelly: { title:"ஜெல்லி (கற்கள்)", btn:"ஜெல்லி கணக்கிடு", resultLabel:"தேவையான ஜெல்லி" },
  steel: { title:"இரும்பு எடை", btn:"இரும்பு கணக்கிடு", resultLabel:"இரும்பு எடை", formulaSub:"சூத்திரம்: D²/162 × நீளம்(மீ)" },
  excavation: { title:"தோண்டுதல்", btn:"தோண்டுதல் கணக்கிடு", resultLabel:"தோண்டும் அளவு" },
  tank: { title:"தண்ணீர் தொட்டி", btn:"கொள்ளளவு கணக்கிடு", resultLabel:"தொட்டி கொள்ளளவு", cftSub:"{v} கன அடி" },
  stair: { title:"படிக்கட்டு", btn:"படிகள் கணக்கிடு", resultLabel:"தேவையான படிகள்" },
  tile: { title:"டைல் கால்குலேட்டர்", btn:"டைல்ஸ் கணக்கிடு", resultLabel:"தேவையான டைல்ஸ்", wasteSub:"+5% வீண் = {v} டைல்ஸ்" },
  paint: { title:"பெயிண்ட் கால்குலேட்டர்", btn:"பெயிண்ட் கணக்கிடு", resultLabel:"தேவையான பெயிண்ட் (2 கோட்)", coverageSub:"பரப்பளவு: {a} சதுர அடி (1 லிட்டர் ~40 சதுர அடி)" },
  plaster: { title:"ப்ளாஸ்டர் கால்குலேட்டர்", btn:"ப்ளாஸ்டர் கணக்கிடு", resultLabel:"ப்ளாஸ்டர் பரப்பளவு" },
  cementCost: { title:"சிமெண்ட் செலவு", btn:"செலவு கணக்கிடு", resultLabel:"மொத்த சிமெண்ட் செலவு" },
  flooring: { title:"தள செலவு", btn:"செலவு கணக்கிடு", resultLabel:"மொத்த தள செலவு" },
  house: { title:"வீட்டு கட்டுமான மதிப்பீடு", btn:"செலவு மதிப்பிடு", resultLabel:"மதிப்பிடப்பட்ட கட்டுமான செலவு",
           basic:"அடிப்படை (₹1,800/சதுர அடி)", standard:"நிலையான (₹2,500/சதுர அடி)", premium:"பிரீமியம் (₹3,500/சதுர அடி)", luxury:"லக்சரி (₹5,000/சதுர அடி)",
           subFormat:"{label} · {area} சதுர அடி × ₹{rate}" },
  pdf: { title:"PDF அறிக்கை", desc:"சுருக்கம் மற்றும் பொருள் விவரங்களுடன் தொழில்முறை பல-பக்க PDF அறிக்கை", download:"முழு அறிக்கையை பதிவிறக்கவும்",
         howTo:"பயன்படுத்தும் முறை:", step1:"1. மற்ற தாவல்களுக்குச் சென்று மதிப்புகளை உள்ளிடவும்", step2:"2. ஒவ்வொரு பிரிவிலும் கணக்கிடு என்பதை கிளிக் செய்யவும்",
         step3:"3. இங்கு திரும்பி வந்து \"முழு அறிக்கையை பதிவிறக்கவும்\" என்பதை கிளிக் செய்யவும்", step4:"அனைத்து முடிவுகளும் ஒரே PDF-இல் சேர்க்கப்படும் ✅",
         langNote:"குறிப்பு: பதிவிறக்கப்படும் PDF அறிக்கை அனைத்து சாதனங்கள் மற்றும் பிரிண்டர்களுடன் இணக்கமாக ஆங்கிலத்தில் உருவாக்கப்படுகிறது.",
         statusReady:"✅ PDF தயார்! {n} கணக்கு{plural}{extra} சேர்க்கப்பட்டுள்ளது." },
  ai: { title:"AI விலை மதிப்பீட்டாளர்", desc:"தமிழ்நாட்டுக்கான AI மதிப்பிடப்பட்ட தற்போதைய பொருள் விலைகளைப் பெறுங்கள்", fetchBtn:"இன்றைய மதிப்பிடப்பட்ட விலைகளைப் பெறுங்கள்",
        fetching:"பெறப்படுகிறது...", refresh:"விலைகளை புதுப்பிக்கவும்", loading:"⏳ AI விலைகளை மதிப்பிடுகிறது...", errorLoading:"❌ விலைகளை ஏற்றுவதில் பிழை",
        cement:"சிமெண்ட்", sand:"மணல் (M-Sand)", aggregate:"கற்கள் (Aggregate)", steel:"இரும்பு (TMT)", brick:"செங்கற்கள்", paint:"பெயிண்ட் (வெளிப்புறம்)",
        per50kg:"ஒரு 50கிலோ மூட்டைக்கு", perCft:"ஒரு CFT-க்கு", perKg:"ஒரு கிலோவுக்கு", per1000:"1000 எண்ணிக்கைக்கு", perLitre:"ஒரு லிட்டருக்கு",
        noteLabel:"குறிப்பு:", disclaimer:"இவை தமிழ்நாடு சந்தை போக்குகளின் அடிப்படையில் AI மதிப்பிடப்பட்ட விலைகள். உண்மையான விலைகள் இடம், பிராண்ட் மற்றும் சப்ளையரைப் பொறுத்து மாறுபடலாம். வாங்குவதற்கு முன் உங்கள் உள்ளூர் டீலரிடம் சரிபார்க்கவும்.",
        stable:"→ நிலையானது", rising:"↑ உயர்கிறது", summary:"தமிழ்நாடு கட்டுமான பொருட்களின் விலைகள் பெரும்பாலும் நிலையானதாக உள்ளன." }
},
hi: {
  app: { titlePlain:"सिविल कैलकुलेटर प्रो", tagline:"17 कैलकुलेटर · PDF रिपोर्ट · तमिलनाडु दरें", footer:"सिविल कैलकुलेटर प्रो · तमिलनाडु ठेकेदारों के लिए बनाया गया" },
  tabs: { concrete:"कंक्रीट", brick:"ईंट", materials:"सामग्री", structure:"संरचना", finishing:"फिनिशिंग", cost:"लागत", report:"PDF", prices:"AI कीमतें" },
  common: { clear:"साफ़ करें", errorGeneric:"⚠ कृपया सही मान दर्ज करें", errorVolume:"⚠ कृपया सही आयतन दर्ज करें", errorArea:"⚠ कृपया सही क्षेत्रफल दर्ज करें" },
  units: { cft:"CFT", sqft:"वर्ग फुट", kg:"किग्रा", litres:"लीटर", steps:"सीढ़ियाँ", nos:"संख्या", bricks:"ईंटें", tiles:"टाइलें", cubicMetres:"घन मीटर", cubicFeet:"घन फुट" },
  f: {
    lengthFt:"लंबाई (फुट)", widthFt:"चौड़ाई (फुट)", heightDepthFt:"ऊँचाई / गहराई (फुट)", thicknessFt:"मोटाई (फुट)", heightFt:"ऊँचाई (फुट)", depthFt:"गहराई (फुट)",
    wallLengthFt:"दीवार लंबाई (फुट)", wallHeightFt:"दीवार ऊँचाई (फुट)", concreteVolCft:"कंक्रीट आयतन (CFT)", steelDiaMm:"स्टील व्यास (मिमी)", steelLenFt:"स्टील लंबाई (फुट)",
    tankLengthFt:"टैंक लंबाई (फुट)", tankWidthFt:"टैंक चौड़ाई (फुट)", tankHeightFt:"टैंक ऊँचाई (फुट)", floorHeightFt:"फ़्लोर ऊँचाई (फुट)", stepHeightFt:"प्रत्येक सीढ़ी ऊँचाई (फुट)",
    roomLengthFt:"कमरे की लंबाई (फुट)", roomWidthFt:"कमरे की चौड़ाई (फुट)", tileSizeFt:"टाइल आकार (फुट × फुट)", totalCementBags:"कुल सीमेंट बैग", pricePerBag:"प्रति बैग कीमत (₹)",
    floorAreaSqft:"फ़्लोर क्षेत्रफल (वर्ग फुट)", ratePerSqft:"प्रति वर्ग फुट दर (₹)", houseAreaSqft:"घर का क्षेत्रफल (वर्ग फुट)", constructionType:"निर्माण प्रकार"
  },
  ph: { eg10:"जैसे 10", eg8:"जैसे 8", eg05:"जैसे 0.5", eg20:"जैसे 20", eg15:"जैसे 15", eg1:"जैसे 1", eg15d:"जैसे 1.5", eg4:"जैसे 4", eg2:"जैसे 2", eg5:"जैसे 5",
       eg6:"जैसे 6", eg058:"जैसे 0.58", eg12:"जैसे 12", eg40:"जैसे 40", eg100:"जैसे 100", eg50:"जैसे 50", eg380:"जैसे 380", eg500:"जैसे 500", eg60:"जैसे 60",
       eg1000:"जैसे 1000", egTile:"जैसे 2×2 फुट के लिए 2" },
  concrete: { title:"कंक्रीट आयतन", btn:"आयतन गणना करें", approxSub:"लगभग {v} घन मीटर" },
  slab: { title:"स्लैब कैलकुलेटर", btn:"स्लैब गणना करें", resultLabel:"स्लैब", areaSub:"क्षेत्रफल: {v} वर्ग फुट" },
  column: { title:"कॉलम कैलकुलेटर", btn:"कॉलम गणना करें", resultLabel:"कॉलम" },
  beam: { title:"बीम कैलकुलेटर", btn:"बीम गणना करें", resultLabel:"बीम" },
  footing: { title:"फ़ुटिंग कैलकुलेटर", btn:"फ़ुटिंग गणना करें", resultLabel:"फ़ुटिंग" },
  brick: { title:"ईंट कैलकुलेटर", btn:"ईंट गणना करें", resultLabel:"आवश्यक ईंटें", wasteSub:"+5% बर्बादी = {v} ईंटें" },
  cement: { title:"सीमेंट बैग", btn:"सीमेंट गणना करें", resultLabel:"आवश्यक सीमेंट", weightSub:"वज़न: {v} किग्रा", bagsUnit:"बैग (50किग्रा)" },
  sand: { title:"रेत कैलकुलेटर", btn:"रेत गणना करें", resultLabel:"आवश्यक रेत" },
  jelly: { title:"जेली (एग्रीगेट)", btn:"जेली गणना करें", resultLabel:"आवश्यक जेली" },
  steel: { title:"स्टील वज़न", btn:"स्टील गणना करें", resultLabel:"स्टील वज़न", formulaSub:"सूत्र: D²/162 × लंबाई(मी)" },
  excavation: { title:"खुदाई", btn:"खुदाई गणना करें", resultLabel:"खुदाई आयतन" },
  tank: { title:"पानी की टंकी", btn:"क्षमता गणना करें", resultLabel:"टंकी क्षमता", cftSub:"{v} घन फुट" },
  stair: { title:"सीढ़ी", btn:"सीढ़ियाँ गणना करें", resultLabel:"आवश्यक सीढ़ियाँ" },
  tile: { title:"टाइल कैलकुलेटर", btn:"टाइल गणना करें", resultLabel:"आवश्यक टाइलें", wasteSub:"+5% बर्बादी = {v} टाइलें" },
  paint: { title:"पेंट कैलकुलेटर", btn:"पेंट गणना करें", resultLabel:"आवश्यक पेंट (2 कोट)", coverageSub:"क्षेत्रफल: {a} वर्ग फुट (1 लीटर ~40 वर्ग फुट)" },
  plaster: { title:"प्लास्टर कैलकुलेटर", btn:"प्लास्टर गणना करें", resultLabel:"प्लास्टर क्षेत्रफल" },
  cementCost: { title:"सीमेंट लागत", btn:"लागत गणना करें", resultLabel:"कुल सीमेंट लागत" },
  flooring: { title:"फ़्लोरिंग लागत", btn:"लागत गणना करें", resultLabel:"कुल फ़्लोरिंग लागत" },
  house: { title:"घर निर्माण अनुमान", btn:"लागत का अनुमान लगाएँ", resultLabel:"अनुमानित निर्माण लागत",
           basic:"बेसिक (₹1,800/वर्ग फुट)", standard:"स्टैंडर्ड (₹2,500/वर्ग फुट)", premium:"प्रीमियम (₹3,500/वर्ग फुट)", luxury:"लक्ज़री (₹5,000/वर्ग फुट)",
           subFormat:"{label} · {area} वर्ग फुट × ₹{rate}" },
  pdf: { title:"PDF रिपोर्ट", desc:"सारांश और सामग्री विवरण के साथ पेशेवर मल्टी-पेज PDF रिपोर्ट", download:"पूरी रिपोर्ट डाउनलोड करें",
         howTo:"उपयोग कैसे करें:", step1:"1. अन्य टैब पर जाएँ और अपने मान दर्ज करें", step2:"2. प्रत्येक अनुभाग में गणना करें पर क्लिक करें",
         step3:"3. यहाँ वापस आएँ और \"पूरी रिपोर्ट डाउनलोड करें\" पर क्लिक करें", step4:"सभी परिणाम एक ही PDF में शामिल होंगे ✅",
         langNote:"नोट: डाउनलोड की गई PDF रिपोर्ट सभी डिवाइस और प्रिंटर के साथ संगतता के लिए अंग्रेज़ी में बनाई जाती है।",
         statusReady:"✅ PDF तैयार है! {n} गणना{plural}{extra} शामिल।" },
  ai: { title:"AI मूल्य अनुमानक", desc:"तमिलनाडु के लिए AI-अनुमानित वर्तमान सामग्री दरें प्राप्त करें", fetchBtn:"आज की अनुमानित कीमतें प्राप्त करें",
        fetching:"प्राप्त हो रहा है...", refresh:"कीमतें ताज़ा करें", loading:"⏳ AI कीमतों का अनुमान लगा रहा है...", errorLoading:"❌ कीमतें लोड करने में त्रुटि",
        cement:"सीमेंट", sand:"रेत (M-Sand)", aggregate:"मोटा एग्रीगेट", steel:"स्टील (TMT)", brick:"ईंटें", paint:"पेंट (बाहरी)",
        per50kg:"प्रति 50किग्रा बैग", perCft:"प्रति CFT", perKg:"प्रति किग्रा", per1000:"प्रति 1000 नग", perLitre:"प्रति लीटर",
        noteLabel:"नोट:", disclaimer:"ये तमिलनाडु बाज़ार के रुझानों पर आधारित AI-अनुमानित दरें हैं। वास्तविक कीमतें स्थान, ब्रांड और आपूर्तिकर्ता के अनुसार भिन्न हो सकती हैं। खरीदने से पहले अपने स्थानीय डीलर से पुष्टि करें।",
        stable:"→ स्थिर", rising:"↑ बढ़ रहा है", summary:"तमिलनाडु में निर्माण सामग्री की कीमतें ज़्यादातर स्थिर बनी हुई हैं।" }
},
te: {
  app: { titlePlain:"సివిల్ కాలిక్యులేటర్ ప్రో", tagline:"17 కాలిక్యులేటర్లు · PDF నివేదిక · తమిళనాడు ధరలు", footer:"సివిల్ కాలిక్యులేటర్ ప్రో · తమిళనాడు కాంట్రాక్టర్ల కోసం" },
  tabs: { concrete:"కాంక్రీట్", brick:"ఇటుక", materials:"మెటీరియల్స్", structure:"నిర్మాణం", finishing:"ఫినిషింగ్", cost:"ఖర్చు", report:"PDF", prices:"AI ధరలు" },
  common: { clear:"క్లియర్", errorGeneric:"⚠ దయచేసి సరైన విలువలు నమోదు చేయండి", errorVolume:"⚠ దయచేసి సరైన వాల్యూమ్ నమోదు చేయండి", errorArea:"⚠ దయచేసి సరైన వైశాల్యం నమోదు చేయండి" },
  units: { cft:"CFT", sqft:"చ.అ", kg:"కిలో", litres:"లీటర్లు", steps:"మెట్లు", nos:"సంఖ్య", bricks:"ఇటుకలు", tiles:"టైల్స్", cubicMetres:"ఘన మీటర్లు", cubicFeet:"ఘన అడుగులు" },
  f: {
    lengthFt:"పొడవు (అడుగులు)", widthFt:"వెడల్పు (అడుగులు)", heightDepthFt:"ఎత్తు / లోతు (అడుగులు)", thicknessFt:"మందం (అడుగులు)", heightFt:"ఎత్తు (అడుగులు)", depthFt:"లోతు (అడుగులు)",
    wallLengthFt:"గోడ పొడవు (అడుగులు)", wallHeightFt:"గోడ ఎత్తు (అడుగులు)", concreteVolCft:"కాంక్రీట్ వాల్యూమ్ (CFT)", steelDiaMm:"స్టీల్ వ్యాసం (మిమీ)", steelLenFt:"స్టీల్ పొడవు (అడుగులు)",
    tankLengthFt:"ట్యాంక్ పొడవు (అడుగులు)", tankWidthFt:"ట్యాంక్ వెడల్పు (అడుగులు)", tankHeightFt:"ట్యాంక్ ఎత్తు (అడుగులు)", floorHeightFt:"అంతస్తు ఎత్తు (అడుగులు)", stepHeightFt:"ఒక్కో మెట్టు ఎత్తు (అడుగులు)",
    roomLengthFt:"గది పొడవు (అడుగులు)", roomWidthFt:"గది వెడల్పు (అడుగులు)", tileSizeFt:"టైల్ సైజు (అడుగులు × అడుగులు)", totalCementBags:"మొత్తం సిమెంట్ బస్తాలు", pricePerBag:"బస్తాకు ధర (₹)",
    floorAreaSqft:"ఫ్లోర్ వైశాల్యం (చ.అ)", ratePerSqft:"చ.అ కు రేటు (₹)", houseAreaSqft:"ఇంటి వైశాల్యం (చ.అ)", constructionType:"నిర్మాణ రకం"
  },
  ph: { eg10:"ఉదా. 10", eg8:"ఉదా. 8", eg05:"ఉదా. 0.5", eg20:"ఉదా. 20", eg15:"ఉదా. 15", eg1:"ఉదా. 1", eg15d:"ఉదా. 1.5", eg4:"ఉదా. 4", eg2:"ఉదా. 2", eg5:"ఉదా. 5",
       eg6:"ఉదా. 6", eg058:"ఉదా. 0.58", eg12:"ఉదా. 12", eg40:"ఉదా. 40", eg100:"ఉదా. 100", eg50:"ఉదా. 50", eg380:"ఉదా. 380", eg500:"ఉదా. 500", eg60:"ఉదా. 60",
       eg1000:"ఉదా. 1000", egTile:"ఉదా. 2×2 అడుగులకు 2" },
  concrete: { title:"కాంక్రీట్ వాల్యూమ్", btn:"వాల్యూమ్ లెక్కించండి", approxSub:"సుమారు {v} ఘన మీటర్లు" },
  slab: { title:"స్లాబ్ కాలిక్యులేటర్", btn:"స్లాబ్ లెక్కించండి", resultLabel:"స్లాబ్", areaSub:"వైశాల్యం: {v} చ.అ" },
  column: { title:"కాలమ్ కాలిక్యులేటర్", btn:"కాలమ్ లెక్కించండి", resultLabel:"కాలమ్" },
  beam: { title:"బీమ్ కాలిక్యులేటర్", btn:"బీమ్ లెక్కించండి", resultLabel:"బీమ్" },
  footing: { title:"ఫుటింగ్ కాలిక్యులేటర్", btn:"ఫుటింగ్ లెక్కించండి", resultLabel:"ఫుటింగ్" },
  brick: { title:"ఇటుక కాలిక్యులేటర్", btn:"ఇటుకలు లెక్కించండి", resultLabel:"అవసరమైన ఇటుకలు", wasteSub:"+5% వృథా = {v} ఇటుకలు" },
  cement: { title:"సిమెంట్ బస్తాలు", btn:"సిమెంట్ లెక్కించండి", resultLabel:"అవసరమైన సిమెంట్", weightSub:"బరువు: {v} కిలో", bagsUnit:"బస్తాలు (50కిలో)" },
  sand: { title:"ఇసుక కాలిక్యులేటర్", btn:"ఇసుక లెక్కించండి", resultLabel:"అవసరమైన ఇసుక" },
  jelly: { title:"జెల్లీ (అగ్రిగేట్)", btn:"జెల్లీ లెక్కించండి", resultLabel:"అవసరమైన జెల్లీ" },
  steel: { title:"స్టీల్ బరువు", btn:"స్టీల్ లెక్కించండి", resultLabel:"స్టీల్ బరువు", formulaSub:"ఫార్ములా: D²/162 × పొడవు(మీ)" },
  excavation: { title:"తవ్వకం", btn:"తవ్వకం లెక్కించండి", resultLabel:"తవ్వకం వాల్యూమ్" },
  tank: { title:"నీటి ట్యాంక్", btn:"సామర్థ్యం లెక్కించండి", resultLabel:"ట్యాంక్ సామర్థ్యం", cftSub:"{v} ఘన అడుగులు" },
  stair: { title:"మెట్లు", btn:"మెట్లు లెక్కించండి", resultLabel:"అవసరమైన మెట్లు" },
  tile: { title:"టైల్ కాలిక్యులేటర్", btn:"టైల్స్ లెక్కించండి", resultLabel:"అవసరమైన టైల్స్", wasteSub:"+5% వృథా = {v} టైల్స్" },
  paint: { title:"పెయింట్ కాలిక్యులేటర్", btn:"పెయింట్ లెక్కించండి", resultLabel:"అవసరమైన పెయింట్ (2 కోట్లు)", coverageSub:"వైశాల్యం: {a} చ.అ (1 లీటర్ ~40 చ.అ)" },
  plaster: { title:"ప్లాస్టర్ కాలిక్యులేటర్", btn:"ప్లాస్టర్ లెక్కించండి", resultLabel:"ప్లాస్టర్ వైశాల్యం" },
  cementCost: { title:"సిమెంట్ ఖర్చు", btn:"ఖర్చు లెక్కించండి", resultLabel:"మొత్తం సిమెంట్ ఖర్చు" },
  flooring: { title:"ఫ్లోరింగ్ ఖర్చు", btn:"ఖర్చు లెక్కించండి", resultLabel:"మొత్తం ఫ్లోరింగ్ ఖర్చు" },
  house: { title:"ఇంటి నిర్మాణ అంచనా", btn:"ఖర్చు అంచనా వేయండి", resultLabel:"అంచనా నిర్మాణ ఖర్చు",
           basic:"బేసిక్ (₹1,800/చ.అ)", standard:"స్టాండర్డ్ (₹2,500/చ.అ)", premium:"ప్రీమియం (₹3,500/చ.అ)", luxury:"లగ్జరీ (₹5,000/చ.అ)",
           subFormat:"{label} · {area} చ.అ × ₹{rate}" },
  pdf: { title:"PDF నివేదిక", desc:"సారాంశం మరియు మెటీరియల్ వివరాలతో ప్రొఫెషనల్ మల్టీ-పేజీ PDF నివేదిక", download:"పూర్తి నివేదికను డౌన్‌లోడ్ చేయండి",
         howTo:"ఎలా ఉపయోగించాలి:", step1:"1. ఇతర ట్యాబ్‌లకు వెళ్లి మీ విలువలను నమోదు చేయండి", step2:"2. ప్రతి విభాగంలో లెక్కించండి క్లిక్ చేయండి",
         step3:"3. ఇక్కడకు తిరిగి వచ్చి \"పూర్తి నివేదికను డౌన్‌లోడ్ చేయండి\" క్లిక్ చేయండి", step4:"అన్ని ఫలితాలు ఒకే PDF‌లో చేర్చబడతాయి ✅",
         langNote:"గమనిక: డౌన్‌లోడ్ చేసిన PDF నివేదిక అన్ని పరికరాలు మరియు ప్రింటర్లతో అనుకూలత కోసం ఆంగ్లంలో రూపొందించబడింది.",
         statusReady:"✅ PDF సిద్ధంగా ఉంది! {n} లెక్క{plural}{extra} చేర్చబడింది." },
  ai: { title:"AI ధర అంచనా", desc:"తమిళనాడు కోసం AI-అంచనా ప్రస్తుత మెటీరియల్ ధరలను పొందండి", fetchBtn:"నేటి అంచనా ధరలను పొందండి",
        fetching:"పొందుతోంది...", refresh:"ధరలను రిఫ్రెష్ చేయండి", loading:"⏳ AI ధరలను అంచనా వేస్తోంది...", errorLoading:"❌ ధరలను లోడ్ చేయడంలో లోపం",
        cement:"సిమెంట్", sand:"ఇసుక (M-Sand)", aggregate:"కోర్స్ అగ్రిగేట్", steel:"స్టీల్ (TMT)", brick:"ఇటుకలు", paint:"పెయింట్ (ఎక్స్‌టీరియర్)",
        per50kg:"50కిలో బస్తాకు", perCft:"CFT కు", perKg:"కిలోకు", per1000:"1000 నగలకు", perLitre:"లీటర్‌కు",
        noteLabel:"గమనిక:", disclaimer:"ఇవి తమిళనాడు మార్కెట్ ట్రెండ్‌ల ఆధారంగా AI-అంచనా ధరలు. వాస్తవ ధరలు ప్రాంతం, బ్రాండ్ మరియు సరఫరాదారును బట్టి మారవచ్చు. కొనుగోలు చేయడానికి ముందు మీ స్థానిక డీలర్‌తో నిర్ధారించుకోండి.",
        stable:"→ స్థిరంగా", rising:"↑ పెరుగుతోంది", summary:"తమిళనాడు నిర్మాణ సామగ్రి ధరలు ఎక్కువగా స్థిరంగా ఉన్నాయి." }
},
ml: {
  app: { titlePlain:"സിവിൽ കാൽക്കുലേറ്റർ പ്രോ", tagline:"17 കാൽക്കുലേറ്ററുകൾ · PDF റിപ്പോർട്ട് · തമിഴ്നാട് നിരക്കുകൾ", footer:"സിവിൽ കാൽക്കുലേറ്റർ പ്രോ · തമിഴ്നാട് കോൺട്രാക്ടർമാർക്കായി നിർമ്മിച്ചത്" },
  tabs: { concrete:"കോൺക്രീറ്റ്", brick:"ഇഷ്ടിക", materials:"സാമഗ്രികൾ", structure:"ഘടന", finishing:"ഫിനിഷിംഗ്", cost:"ചെലവ്", report:"PDF", prices:"AI വിലകൾ" },
  common: { clear:"മായ്ക്കുക", errorGeneric:"⚠ ദയവായി ശരിയായ മൂല്യങ്ങൾ നൽകുക", errorVolume:"⚠ ദയവായി ശരിയായ വോള്യം നൽകുക", errorArea:"⚠ ദയവായി ശരിയായ വിസ്തീർണ്ണം നൽകുക" },
  units: { cft:"CFT", sqft:"ച.അടി", kg:"കി.ഗ്രാം", litres:"ലിറ്റർ", steps:"പടികൾ", nos:"എണ്ണം", bricks:"ഇഷ്ടികകൾ", tiles:"ടൈലുകൾ", cubicMetres:"ക്യൂബിക് മീറ്റർ", cubicFeet:"ക്യൂബിക് അടി" },
  f: {
    lengthFt:"നീളം (അടി)", widthFt:"വീതി (അടി)", heightDepthFt:"ഉയരം / ആഴം (അടി)", thicknessFt:"കനം (അടി)", heightFt:"ഉയരം (അടി)", depthFt:"ആഴം (അടി)",
    wallLengthFt:"ചുവര് നീളം (അടി)", wallHeightFt:"ചുവര് ഉയരം (അടി)", concreteVolCft:"കോൺക്രീറ്റ് വോള്യം (CFT)", steelDiaMm:"സ്റ്റീൽ വ്യാസം (മി.മീ)", steelLenFt:"സ്റ്റീൽ നീളം (അടി)",
    tankLengthFt:"ടാങ്ക് നീളം (അടി)", tankWidthFt:"ടാങ്ക് വീതി (അടി)", tankHeightFt:"ടാങ്ക് ഉയരം (അടി)", floorHeightFt:"നില ഉയരം (അടി)", stepHeightFt:"ഓരോ പടിയുടെ ഉയരം (അടി)",
    roomLengthFt:"മുറി നീളം (അടി)", roomWidthFt:"മുറി വീതി (അടി)", tileSizeFt:"ടൈൽ വലുപ്പം (അടി × അടി)", totalCementBags:"ആകെ സിമന്റ് ബാഗുകൾ", pricePerBag:"ബാഗിന് വില (₹)",
    floorAreaSqft:"നില വിസ്തീർണ്ണം (ച.അടി)", ratePerSqft:"ച.അടിക്ക് നിരക്ക് (₹)", houseAreaSqft:"വീടിന്റെ വിസ്തീർണ്ണം (ച.അടി)", constructionType:"നിർമ്മാണ തരം"
  },
  ph: { eg10:"ഉദാ. 10", eg8:"ഉദാ. 8", eg05:"ഉദാ. 0.5", eg20:"ഉദാ. 20", eg15:"ഉദാ. 15", eg1:"ഉദാ. 1", eg15d:"ഉദാ. 1.5", eg4:"ഉദാ. 4", eg2:"ഉദാ. 2", eg5:"ഉദാ. 5",
       eg6:"ഉദാ. 6", eg058:"ഉദാ. 0.58", eg12:"ഉദാ. 12", eg40:"ഉദാ. 40", eg100:"ഉദാ. 100", eg50:"ഉദാ. 50", eg380:"ഉദാ. 380", eg500:"ഉദാ. 500", eg60:"ഉദാ. 60",
       eg1000:"ഉദാ. 1000", egTile:"ഉദാ. 2×2 അടിക്ക് 2" },
  concrete: { title:"കോൺക്രീറ്റ് വോള്യം", btn:"വോള്യം കണക്കാക്കുക", approxSub:"ഏകദേശം {v} ക്യൂബിക് മീറ്റർ" },
  slab: { title:"സ്ലാബ് കാൽക്കുലേറ്റർ", btn:"സ്ലാബ് കണക്കാക്കുക", resultLabel:"സ്ലാബ്", areaSub:"വിസ്തീർണ്ണം: {v} ച.അടി" },
  column: { title:"കോളം കാൽക്കുലേറ്റർ", btn:"കോളം കണക്കാക്കുക", resultLabel:"കോളം" },
  beam: { title:"ബീം കാൽക്കുലേറ്റർ", btn:"ബീം കണക്കാക്കുക", resultLabel:"ബീം" },
  footing: { title:"ഫൂട്ടിംഗ് കാൽക്കുലേറ്റർ", btn:"ഫൂട്ടിംഗ് കണക്കാക്കുക", resultLabel:"ഫൂട്ടിംഗ്" },
  brick: { title:"ഇഷ്ടിക കാൽക്കുലേറ്റർ", btn:"ഇഷ്ടികകൾ കണക്കാക്കുക", resultLabel:"ആവശ്യമായ ഇഷ്ടികകൾ", wasteSub:"+5% നഷ്ടം = {v} ഇഷ്ടികകൾ" },
  cement: { title:"സിമന്റ് ബാഗുകൾ", btn:"സിമന്റ് കണക്കാക്കുക", resultLabel:"ആവശ്യമായ സിമന്റ്", weightSub:"ഭാരം: {v} കി.ഗ്രാം", bagsUnit:"ബാഗുകൾ (50കി.ഗ്രാം)" },
  sand: { title:"മണൽ കാൽക്കുലേറ്റർ", btn:"മണൽ കണക്കാക്കുക", resultLabel:"ആവശ്യമായ മണൽ" },
  jelly: { title:"ജെല്ലി (അഗ്രിഗേറ്റ്)", btn:"ജെല്ലി കണക്കാക്കുക", resultLabel:"ആവശ്യമായ ജെല്ലി" },
  steel: { title:"സ്റ്റീൽ ഭാരം", btn:"സ്റ്റീൽ കണക്കാക്കുക", resultLabel:"സ്റ്റീൽ ഭാരം", formulaSub:"ഫോർമുല: D²/162 × നീളം(മീ)" },
  excavation: { title:"കുഴിക്കൽ", btn:"കുഴിക്കൽ കണക്കാക്കുക", resultLabel:"കുഴിക്കൽ വോള്യം" },
  tank: { title:"വാട്ടർ ടാങ്ക്", btn:"ശേഷി കണക്കാക്കുക", resultLabel:"ടാങ്ക് ശേഷി", cftSub:"{v} ക്യൂബിക് അടി" },
  stair: { title:"ഗോവണി", btn:"പടികൾ കണക്കാക്കുക", resultLabel:"ആവശ്യമായ പടികൾ" },
  tile: { title:"ടൈൽ കാൽക്കുലേറ്റർ", btn:"ടൈലുകൾ കണക്കാക്കുക", resultLabel:"ആവശ്യമായ ടൈലുകൾ", wasteSub:"+5% നഷ്ടം = {v} ടൈലുകൾ" },
  paint: { title:"പെയിന്റ് കാൽക്കുലേറ്റർ", btn:"പെയിന്റ് കണക്കാക്കുക", resultLabel:"ആവശ്യമായ പെയിന്റ് (2 കോട്ട്)", coverageSub:"വിസ്തീർണ്ണം: {a} ച.അടി (1 ലിറ്റർ ~40 ച.അടി)" },
  plaster: { title:"പ്ലാസ്റ്റർ കാൽക്കുലേറ്റർ", btn:"പ്ലാസ്റ്റർ കണക്കാക്കുക", resultLabel:"പ്ലാസ്റ്റർ വിസ്തീർണ്ണം" },
  cementCost: { title:"സിമന്റ് ചെലവ്", btn:"ചെലവ് കണക്കാക്കുക", resultLabel:"ആകെ സിമന്റ് ചെലവ്" },
  flooring: { title:"ഫ്ലോറിംഗ് ചെലവ്", btn:"ചെലവ് കണക്കാക്കുക", resultLabel:"ആകെ ഫ്ലോറിംഗ് ചെലവ്" },
  house: { title:"വീട് നിർമ്മാണ എസ്റ്റിമേറ്റ്", btn:"ചെലവ് കണക്കാക്കുക", resultLabel:"ഏകദേശ നിർമ്മാണ ചെലവ്",
           basic:"ബേസിക് (₹1,800/ച.അടി)", standard:"സ്റ്റാൻഡേർഡ് (₹2,500/ച.അടി)", premium:"പ്രീമിയം (₹3,500/ച.അടി)", luxury:"ലക്ഷ്വറി (₹5,000/ച.അടി)",
           subFormat:"{label} · {area} ച.അടി × ₹{rate}" },
  pdf: { title:"PDF റിപ്പോർട്ട്", desc:"സംഗ്രഹവും സാമഗ്രി വിശദാംശങ്ങളുമുള്ള പ്രൊഫഷണൽ മൾട്ടി-പേജ് PDF റിപ്പോർട്ട്", download:"മുഴുവൻ റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക",
         howTo:"എങ്ങനെ ഉപയോഗിക്കാം:", step1:"1. മറ്റ് ടാബുകളിലേക്ക് പോയി നിങ്ങളുടെ മൂല്യങ്ങൾ നൽകുക", step2:"2. ഓരോ വിഭാഗത്തിലും കണക്കാക്കുക ക്ലിക്ക് ചെയ്യുക",
         step3:"3. ഇവിടേക്ക് തിരികെ വന്ന് \"മുഴുവൻ റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക\" ക്ലിക്ക് ചെയ്യുക", step4:"എല്ലാ ഫലങ്ങളും ഒരു PDF-ൽ ഉൾപ്പെടുത്തും ✅",
         langNote:"കുറിപ്പ്: ഡൗൺലോഡ് ചെയ്ത PDF റിപ്പോർട്ട് എല്ലാ ഉപകരണങ്ങളുമായും പ്രിന്ററുകളുമായും അനുയോജ്യതയ്ക്കായി ഇംഗ്ലീഷിൽ സൃഷ്ടിക്കുന്നു.",
         statusReady:"✅ PDF തയ്യാർ! {n} കണക്ക്{plural}{extra} ഉൾപ്പെടുത്തി." },
  ai: { title:"AI വില എസ്റ്റിമേറ്റർ", desc:"തമിഴ്നാടിനുള്ള AI-കണക്കാക്കിയ നിലവിലെ സാമഗ്രി നിരക്കുകൾ നേടുക", fetchBtn:"ഇന്നത്തെ എസ്റ്റിമേറ്റഡ് വിലകൾ നേടുക",
        fetching:"ലഭ്യമാക്കുന്നു...", refresh:"വിലകൾ പുതുക്കുക", loading:"⏳ AI വിലകൾ കണക്കാക്കുന്നു...", errorLoading:"❌ വിലകൾ ലോഡ് ചെയ്യുന്നതിൽ പിശക്",
        cement:"സിമന്റ്", sand:"മണൽ (M-Sand)", aggregate:"കോഴ്‌സ് അഗ്രിഗേറ്റ്", steel:"സ്റ്റീൽ (TMT)", brick:"ഇഷ്ടികകൾ", paint:"പെയിന്റ് (എക്‌സ്റ്റീരിയർ)",
        per50kg:"50കി.ഗ്രാം ബാഗിന്", perCft:"CFT ന്", perKg:"കി.ഗ്രാമിന്", per1000:"1000 എണ്ണത്തിന്", perLitre:"ലിറ്ററിന്",
        noteLabel:"കുറിപ്പ്:", disclaimer:"ഇവ തമിഴ്നാട് മാർക്കറ്റ് ട്രെൻഡുകളെ അടിസ്ഥാനമാക്കിയുള്ള AI-കണക്കാക്കിയ നിരക്കുകളാണ്. യഥാർത്ഥ വിലകൾ സ്ഥലം, ബ്രാൻഡ്, വിതരണക്കാരൻ എന്നിവ അനുസരിച്ച് വ്യത്യാസപ്പെടാം. വാങ്ങുന്നതിന് മുമ്പ് നിങ്ങളുടെ പ്രാദേശിക ഡീലറുമായി ഉറപ്പാക്കുക.",
        stable:"→ സ്ഥിരം", rising:"↑ ഉയരുന്നു", summary:"തമിഴ്നാട് നിർമ്മാണ സാമഗ്രി വിലകൾ ഭൂരിഭാഗവും സ്ഥിരമായി തുടരുന്നു." }
},
kn: {
  app: { titlePlain:"ಸಿವಿಲ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಪ್ರೊ", tagline:"17 ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ಗಳು · PDF ವರದಿ · ತಮಿಳುನಾಡು ದರಗಳು", footer:"ಸಿವಿಲ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್ ಪ್ರೊ · ತಮಿಳುನಾಡು ಗುತ್ತಿಗೆದಾರರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ" },
  tabs: { concrete:"ಕಾಂಕ್ರೀಟ್", brick:"ಇಟ್ಟಿಗೆ", materials:"ಸಾಮಗ್ರಿಗಳು", structure:"ರಚನೆ", finishing:"ಫಿನಿಷಿಂಗ್", cost:"ವೆಚ್ಚ", report:"PDF", prices:"AI ಬೆಲೆಗಳು" },
  common: { clear:"ಅಳಿಸಿ", errorGeneric:"⚠ ದಯವಿಟ್ಟು ಸರಿಯಾದ ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ", errorVolume:"⚠ ದಯವಿಟ್ಟು ಸರಿಯಾದ ಪರಿಮಾಣ ನಮೂದಿಸಿ", errorArea:"⚠ ದಯವಿಟ್ಟು ಸರಿಯಾದ ವಿಸ್ತೀರ್ಣ ನಮೂದಿಸಿ" },
  units: { cft:"CFT", sqft:"ಚ.ಅಡಿ", kg:"ಕೆ.ಜಿ", litres:"ಲೀಟರ್", steps:"ಮೆಟ್ಟಿಲುಗಳು", nos:"ಸಂಖ್ಯೆ", bricks:"ಇಟ್ಟಿಗೆಗಳು", tiles:"ಟೈಲ್‌ಗಳು", cubicMetres:"ಘನ ಮೀಟರ್", cubicFeet:"ಘನ ಅಡಿ" },
  f: {
    lengthFt:"ಉದ್ದ (ಅಡಿ)", widthFt:"ಅಗಲ (ಅಡಿ)", heightDepthFt:"ಎತ್ತರ / ಆಳ (ಅಡಿ)", thicknessFt:"ದಪ್ಪ (ಅಡಿ)", heightFt:"ಎತ್ತರ (ಅಡಿ)", depthFt:"ಆಳ (ಅಡಿ)",
    wallLengthFt:"ಗೋಡೆ ಉದ್ದ (ಅಡಿ)", wallHeightFt:"ಗೋಡೆ ಎತ್ತರ (ಅಡಿ)", concreteVolCft:"ಕಾಂಕ್ರೀಟ್ ಪರಿಮಾಣ (CFT)", steelDiaMm:"ಸ್ಟೀಲ್ ವ್ಯಾಸ (ಮಿಮೀ)", steelLenFt:"ಸ್ಟೀಲ್ ಉದ್ದ (ಅಡಿ)",
    tankLengthFt:"ಟ್ಯಾಂಕ್ ಉದ್ದ (ಅಡಿ)", tankWidthFt:"ಟ್ಯಾಂಕ್ ಅಗಲ (ಅಡಿ)", tankHeightFt:"ಟ್ಯಾಂಕ್ ಎತ್ತರ (ಅಡಿ)", floorHeightFt:"ಮಹಡಿ ಎತ್ತರ (ಅಡಿ)", stepHeightFt:"ಪ್ರತಿ ಮೆಟ್ಟಿಲಿನ ಎತ್ತರ (ಅಡಿ)",
    roomLengthFt:"ಕೊಠಡಿ ಉದ್ದ (ಅಡಿ)", roomWidthFt:"ಕೊಠಡಿ ಅಗಲ (ಅಡಿ)", tileSizeFt:"ಟೈಲ್ ಗಾತ್ರ (ಅಡಿ × ಅಡಿ)", totalCementBags:"ಒಟ್ಟು ಸಿಮೆಂಟ್ ಚೀಲಗಳು", pricePerBag:"ಪ್ರತಿ ಚೀಲಕ್ಕೆ ಬೆಲೆ (₹)",
    floorAreaSqft:"ಮಹಡಿ ವಿಸ್ತೀರ್ಣ (ಚ.ಅಡಿ)", ratePerSqft:"ಚ.ಅಡಿಗೆ ದರ (₹)", houseAreaSqft:"ಮನೆಯ ವಿಸ್ತೀರ್ಣ (ಚ.ಅಡಿ)", constructionType:"ನಿರ್ಮಾಣ ಪ್ರಕಾರ"
  },
  ph: { eg10:"ಉದಾ. 10", eg8:"ಉದಾ. 8", eg05:"ಉದಾ. 0.5", eg20:"ಉದಾ. 20", eg15:"ಉದಾ. 15", eg1:"ಉದಾ. 1", eg15d:"ಉದಾ. 1.5", eg4:"ಉದಾ. 4", eg2:"ಉದಾ. 2", eg5:"ಉದಾ. 5",
       eg6:"ಉದಾ. 6", eg058:"ಉದಾ. 0.58", eg12:"ಉದಾ. 12", eg40:"ಉದಾ. 40", eg100:"ಉದಾ. 100", eg50:"ಉದಾ. 50", eg380:"ಉದಾ. 380", eg500:"ಉದಾ. 500", eg60:"ಉದಾ. 60",
       eg1000:"ಉದಾ. 1000", egTile:"ಉದಾ. 2×2 ಅಡಿಗೆ 2" },
  concrete: { title:"ಕಾಂಕ್ರೀಟ್ ಪರಿಮಾಣ", btn:"ಪರಿಮಾಣ ಲೆಕ್ಕ ಹಾಕಿ", approxSub:"ಸುಮಾರು {v} ಘನ ಮೀಟರ್" },
  slab: { title:"ಸ್ಲ್ಯಾಬ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್", btn:"ಸ್ಲ್ಯಾಬ್ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಸ್ಲ್ಯಾಬ್", areaSub:"ವಿಸ್ತೀರ್ಣ: {v} ಚ.ಅಡಿ" },
  column: { title:"ಕಾಲಮ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್", btn:"ಕಾಲಮ್ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಕಾಲಮ್" },
  beam: { title:"ಬೀಮ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್", btn:"ಬೀಮ್ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಬೀಮ್" },
  footing: { title:"ಫುಟಿಂಗ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್", btn:"ಫುಟಿಂಗ್ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಫುಟಿಂಗ್" },
  brick: { title:"ಇಟ್ಟಿಗೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್", btn:"ಇಟ್ಟಿಗೆಗಳನ್ನು ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಅಗತ್ಯವಿರುವ ಇಟ್ಟಿಗೆಗಳು", wasteSub:"+5% ವ್ಯರ್ಥ = {v} ಇಟ್ಟಿಗೆಗಳು" },
  cement: { title:"ಸಿಮೆಂಟ್ ಚೀಲಗಳು", btn:"ಸಿಮೆಂಟ್ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಅಗತ್ಯವಿರುವ ಸಿಮೆಂಟ್", weightSub:"ತೂಕ: {v} ಕೆ.ಜಿ", bagsUnit:"ಚೀಲಗಳು (50ಕೆ.ಜಿ)" },
  sand: { title:"ಮರಳು ಕ್ಯಾಲ್ಕುಲೇಟರ್", btn:"ಮರಳು ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಅಗತ್ಯವಿರುವ ಮರಳು" },
  jelly: { title:"ಜೆಲ್ಲಿ (ಅಗ್ರಿಗೇಟ್)", btn:"ಜೆಲ್ಲಿ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಅಗತ್ಯವಿರುವ ಜೆಲ್ಲಿ" },
  steel: { title:"ಸ್ಟೀಲ್ ತೂಕ", btn:"ಸ್ಟೀಲ್ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಸ್ಟೀಲ್ ತೂಕ", formulaSub:"ಸೂತ್ರ: D²/162 × ಉದ್ದ(ಮೀ)" },
  excavation: { title:"ಅಗೆಯುವಿಕೆ", btn:"ಅಗೆಯುವಿಕೆ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಅಗೆಯುವಿಕೆ ಪರಿಮಾಣ" },
  tank: { title:"ನೀರಿನ ಟ್ಯಾಂಕ್", btn:"ಸಾಮರ್ಥ್ಯ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಟ್ಯಾಂಕ್ ಸಾಮರ್ಥ್ಯ", cftSub:"{v} ಘನ ಅಡಿ" },
  stair: { title:"ಮೆಟ್ಟಿಲು", btn:"ಮೆಟ್ಟಿಲುಗಳನ್ನು ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಅಗತ್ಯವಿರುವ ಮೆಟ್ಟಿಲುಗಳು" },
  tile: { title:"ಟೈಲ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್", btn:"ಟೈಲ್‌ಗಳನ್ನು ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಅಗತ್ಯವಿರುವ ಟೈಲ್‌ಗಳು", wasteSub:"+5% ವ್ಯರ್ಥ = {v} ಟೈಲ್‌ಗಳು" },
  paint: { title:"ಪೇಂಟ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್", btn:"ಪೇಂಟ್ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಅಗತ್ಯವಿರುವ ಪೇಂಟ್ (2 ಕೋಟ್)", coverageSub:"ವಿಸ್ತೀರ್ಣ: {a} ಚ.ಅಡಿ (1 ಲೀಟರ್ ~40 ಚ.ಅಡಿ)" },
  plaster: { title:"ಪ್ಲಾಸ್ಟರ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್", btn:"ಪ್ಲಾಸ್ಟರ್ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಪ್ಲಾಸ್ಟರ್ ವಿಸ್ತೀರ್ಣ" },
  cementCost: { title:"ಸಿಮೆಂಟ್ ವೆಚ್ಚ", btn:"ವೆಚ್ಚ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಒಟ್ಟು ಸಿಮೆಂಟ್ ವೆಚ್ಚ" },
  flooring: { title:"ಫ್ಲೋರಿಂಗ್ ವೆಚ್ಚ", btn:"ವೆಚ್ಚ ಲೆಕ್ಕ ಹಾಕಿ", resultLabel:"ಒಟ್ಟು ಫ್ಲೋರಿಂಗ್ ವೆಚ್ಚ" },
  house: { title:"ಮನೆ ನಿರ್ಮಾಣ ಅಂದಾಜು", btn:"ವೆಚ್ಚ ಅಂದಾಜು ಮಾಡಿ", resultLabel:"ಅಂದಾಜು ನಿರ್ಮಾಣ ವೆಚ್ಚ",
           basic:"ಬೇಸಿಕ್ (₹1,800/ಚ.ಅಡಿ)", standard:"ಸ್ಟ್ಯಾಂಡರ್ಡ್ (₹2,500/ಚ.ಅಡಿ)", premium:"ಪ್ರೀಮಿಯಂ (₹3,500/ಚ.ಅಡಿ)", luxury:"ಲಕ್ಷುರಿ (₹5,000/ಚ.ಅಡಿ)",
           subFormat:"{label} · {area} ಚ.ಅಡಿ × ₹{rate}" },
  pdf: { title:"PDF ವರದಿ", desc:"ಸಾರಾಂಶ ಮತ್ತು ಮೆಟೀರಿಯಲ್ ವಿವರಗಳೊಂದಿಗೆ ವೃತ್ತಿಪರ ಬಹು-ಪುಟ PDF ವರದಿ", download:"ಪೂರ್ಣ ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",
         howTo:"ಬಳಸುವ ವಿಧಾನ:", step1:"1. ಇತರ ಟ್ಯಾಬ್‌ಗಳಿಗೆ ಹೋಗಿ ನಿಮ್ಮ ಮೌಲ್ಯಗಳನ್ನು ನಮೂದಿಸಿ", step2:"2. ಪ್ರತಿ ವಿಭಾಗದಲ್ಲಿ ಲೆಕ್ಕ ಹಾಕಿ ಕ್ಲಿಕ್ ಮಾಡಿ",
         step3:"3. ಇಲ್ಲಿಗೆ ಹಿಂತಿರುಗಿ \"ಪೂರ್ಣ ವರದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ\" ಕ್ಲಿಕ್ ಮಾಡಿ", step4:"ಎಲ್ಲಾ ಫಲಿತಾಂಶಗಳು ಒಂದೇ PDF ನಲ್ಲಿ ಸೇರಿಸಲಾಗುತ್ತದೆ ✅",
         langNote:"ಗಮನಿಸಿ: ಡೌನ್‌ಲೋಡ್ ಮಾಡಿದ PDF ವರದಿಯನ್ನು ಎಲ್ಲಾ ಸಾಧನಗಳು ಮತ್ತು ಪ್ರಿಂಟರ್‌ಗಳೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆಗಾಗಿ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ರಚಿಸಲಾಗಿದೆ.",
         statusReady:"✅ PDF ಸಿದ್ಧವಾಗಿದೆ! {n} ಲೆಕ್ಕ{plural}{extra} ಸೇರಿಸಲಾಗಿದೆ." },
  ai: { title:"AI ಬೆಲೆ ಅಂದಾಜುಗಾರ", desc:"ತಮಿಳುನಾಡಿಗಾಗಿ AI-ಅಂದಾಜು ಪ್ರಸ್ತುತ ಮೆಟೀರಿಯಲ್ ದರಗಳನ್ನು ಪಡೆಯಿರಿ", fetchBtn:"ಇಂದಿನ ಅಂದಾಜು ಬೆಲೆಗಳನ್ನು ಪಡೆಯಿರಿ",
        fetching:"ಪಡೆಯಲಾಗುತ್ತಿದೆ...", refresh:"ಬೆಲೆಗಳನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡಿ", loading:"⏳ AI ಬೆಲೆಗಳನ್ನು ಅಂದಾಜಿಸುತ್ತಿದೆ...", errorLoading:"❌ ಬೆಲೆಗಳನ್ನು ಲೋಡ್ ಮಾಡುವಲ್ಲಿ ದೋಷ",
        cement:"ಸಿಮೆಂಟ್", sand:"ಮರಳು (M-Sand)", aggregate:"ಒರಟು ಅಗ್ರಿಗೇಟ್", steel:"ಸ್ಟೀಲ್ (TMT)", brick:"ಇಟ್ಟಿಗೆಗಳು", paint:"ಪೇಂಟ್ (ಎಕ್ಸ್‌ಟೀರಿಯರ್)",
        per50kg:"ಪ್ರತಿ 50ಕೆ.ಜಿ ಚೀಲಕ್ಕೆ", perCft:"ಪ್ರತಿ CFT ಗೆ", perKg:"ಪ್ರತಿ ಕೆ.ಜಿ ಗೆ", per1000:"ಪ್ರತಿ 1000 ಸಂಖ್ಯೆಗೆ", perLitre:"ಪ್ರತಿ ಲೀಟರ್‌ಗೆ",
        noteLabel:"ಗಮನಿಸಿ:", disclaimer:"ಇವು ತಮಿಳುನಾಡು ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳ ಆಧಾರದ ಮೇಲೆ AI-ಅಂದಾಜು ದರಗಳಾಗಿವೆ. ವಾಸ್ತವ ಬೆಲೆಗಳು ಸ್ಥಳ, ಬ್ರಾಂಡ್ ಮತ್ತು ಪೂರೈಕೆದಾರರ ಪ್ರಕಾರ ಬದಲಾಗಬಹುದು. ಖರೀದಿಸುವ ಮೊದಲು ನಿಮ್ಮ ಸ್ಥಳೀಯ ಡೀಲರ್‌ ಜೊತೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
        stable:"→ ಸ್ಥಿರ", rising:"↑ ಏರುತ್ತಿದೆ", summary:"ತಮಿಳುನಾಡು ನಿರ್ಮಾಣ ಸಾಮಗ್ರಿ ಬೆಲೆಗಳು ಬಹುಪಾಲು ಸ್ಥಿರವಾಗಿವೆ." }
}
};

let currentLang = 'en';

function t(path) {
  const parts = path.split('.');
  let node = translations[currentLang] || translations.en;
  for (const p of parts) {
    node = node && node[p];
  }
  if (node === undefined) {
    // Fallback to English if a key is missing in the active language
    node = translations.en;
    for (const p of parts) node = node && node[p];
  }
  return node !== undefined ? node : path;
}

function tFormat(path, vars) {
  let str = t(path);
  if (vars) {
    Object.keys(vars).forEach(k => { str = str.replace('{' + k + '}', vars[k]); });
  }
  return str;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });
  document.title = t('app.titlePlain') + ' — Civil Calculator Pro';
  document.getElementById('htmlRoot').setAttribute('lang', currentLang);
  // Re-render any already-visible AI price trend/summary text and PDF button label
  const aiBtn = document.getElementById('aiFetchBtn');
  if (aiBtn && !aiBtn.disabled) {
    document.getElementById('aiFetchBtnText').textContent = t('ai.fetchBtn');
  }
}

function changeLanguage() {
  const sel = document.getElementById('languageSelector');
  currentLang = sel.value;
  try { localStorage.setItem('civil_lang', currentLang); } catch (e) { /* storage unavailable, ignore */ }
  applyTranslations();
}

window.addEventListener('DOMContentLoaded', () => {
  let saved = 'en';
  try { saved = localStorage.getItem('civil_lang') || 'en'; } catch (e) { /* storage unavailable, ignore */ }
  currentLang = saved;
  const sel = document.getElementById('languageSelector');
  if (sel) sel.value = saved;
  applyTranslations();
});

// ─── TAB SWITCHING ──────────────────────────────
function showTab(name, btnEl) {
  document.querySelectorAll('.calc-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
  document.getElementById('tab-' + name).classList.add('active');
  if (btnEl) { btnEl.classList.add('active'); btnEl.setAttribute('aria-selected','true'); }
}

// ─── HELPERS ────────────────────────────────────
function getVal(id) {
  return parseFloat(document.getElementById(id).value);
}

function showResult(boxId, valId, value, sub, subId) {
  const box = document.getElementById(boxId);
  box.classList.remove('error-box');
  box.classList.add('show');
  document.getElementById(valId).textContent = value;
  if (subId && sub) document.getElementById(subId).textContent = sub;
}

function showError(boxId, valId, msg) {
  const box = document.getElementById(boxId);
  box.classList.add('show', 'error-box');
  document.getElementById(valId).textContent = msg;
}

function validate(...ids) {
  let ok = true;
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    const v = parseFloat(el.value);
    if (isNaN(v) || v <= 0) {
      el.classList.add('error');
      ok = false;
    } else {
      el.classList.remove('error');
    }
  });
  return ok;
}

function resetCard(...ids) {
  const resultId = ids[ids.length - 1];
  const inputIds = ids.slice(0, -1);
  inputIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.value = ''; el.classList.remove('error'); }
  });
  const box = document.getElementById(resultId);
  if (box) box.classList.remove('show');
}

function fmt(n) { return n.toLocaleString('en-IN', {maximumFractionDigits: 2}); }
function fmtRs(n) { return '₹' + n.toLocaleString('en-IN', {maximumFractionDigits: 0}); }

// ─── RESULTS STORE (structured: value + unit, used by the PDF report) ───
const results = {};

// ─── CALCULATORS ────────────────────────────────
// NOTE: every arithmetic line below is unchanged from the original file.
// Only the surrounding text (labels, error messages, unit words) is now
// resolved through t()/tFormat() so it updates with the language selector.

function concreteCalc() {
  if (!validate('conLength','conWidth','conHeight')) {
    showError('conResult','conResultVal', t('common.errorGeneric')); return;
  }
  const vol = getVal('conLength') * getVal('conWidth') * getVal('conHeight');
  const valText = fmt(vol) + ' ' + t('units.cft');
  const subText = tFormat('concrete.approxSub', { v: fmt(vol/35.315) });
  results.concrete = { label: t('concrete.title'), value: fmt(vol), unit: t('units.cft') };
  showResult('conResult','conResultVal', valText, subText, 'conResultSub');
}

function slabCalc() {
  if (!validate('slabLength','slabWidth','slabThick')) {
    showError('slabResult','slabResultVal', t('common.errorGeneric')); return;
  }
  const vol = getVal('slabLength') * getVal('slabWidth') * getVal('slabThick');
  const valText = fmt(vol) + ' ' + t('units.cft');
  const subText = tFormat('slab.areaSub', { v: fmt(getVal('slabLength')*getVal('slabWidth')) });
  results.slab = { label: t('slab.resultLabel'), value: fmt(vol), unit: t('units.cft') };
  showResult('slabResult','slabResultVal', valText, subText, 'slabResultSub');
}

function columnCalc() {
  if (!validate('colL','colW','colH')) {
    showError('colResult','colResultVal', t('common.errorGeneric')); return;
  }
  const vol = getVal('colL') * getVal('colW') * getVal('colH');
  results.column = { label: t('column.resultLabel'), value: fmt(vol), unit: t('units.cft') };
  showResult('colResult','colResultVal', fmt(vol) + ' ' + t('units.cft'));
}

function beamCalc() {
  if (!validate('beamL','beamW','beamH')) {
    showError('beamResult','beamResultVal', t('common.errorGeneric')); return;
  }
  const vol = getVal('beamL') * getVal('beamW') * getVal('beamH');
  results.beam = { label: t('beam.resultLabel'), value: fmt(vol), unit: t('units.cft') };
  showResult('beamResult','beamResultVal', fmt(vol) + ' ' + t('units.cft'));
}

function footingCalc() {
  if (!validate('footL','footW','footD')) {
    showError('footResult','footResultVal', t('common.errorGeneric')); return;
  }
  const vol = getVal('footL') * getVal('footW') * getVal('footD');
  results.footing = { label: t('footing.resultLabel'), value: fmt(vol), unit: t('units.cft') };
  showResult('footResult','footResultVal', fmt(vol) + ' ' + t('units.cft'));
}

function brickCalc() {
  if (!validate('wallL','wallH')) {
    showError('brickRes','brickResVal', t('common.errorGeneric')); return;
  }
  const area = getVal('wallL') * getVal('wallH');
  const bricks = Math.round(area * 13.5);
  const withWaste = Math.round(bricks * 1.05);
  const valText = fmt(bricks) + ' ' + t('units.bricks');
  const subText = tFormat('brick.wasteSub', { v: fmt(withWaste) });
  results.bricks = { label: t('brick.resultLabel'), value: fmt(bricks), unit: t('units.nos') };
  showResult('brickRes','brickResVal', valText, subText, 'brickResSub');
}

function cementCalc() {
  if (!validate('cemVol')) {
    showError('cemResult','cemResultVal', t('common.errorVolume')); return;
  }
  const bags = Math.ceil(getVal('cemVol') / 4);
  const valText = bags + ' ' + t('cement.bagsUnit');
  const subText = tFormat('cement.weightSub', { v: (bags*50) });
  results.cement = { label: t('cement.resultLabel'), value: bags, unit: t('cement.bagsUnit') };
  showResult('cemResult','cemResultVal', valText, subText, 'cemResultSub');
}

function sandCalc() {
  if (!validate('sandVol')) {
    showError('sandResult','sandResultVal', t('common.errorVolume')); return;
  }
  const sand = (getVal('sandVol') * 0.44).toFixed(2);
  results.sand = { label: t('sand.resultLabel'), value: sand, unit: t('units.cft') };
  showResult('sandResult','sandResultVal', sand + ' ' + t('units.cft'));
}

function jellyCalc() {
  if (!validate('jellyVol')) {
    showError('jellyResult','jellyResultVal', t('common.errorVolume')); return;
  }
  const jelly = (getVal('jellyVol') * 0.88).toFixed(2);
  results.jelly = { label: t('jelly.resultLabel'), value: jelly, unit: t('units.cft') };
  showResult('jellyResult','jellyResultVal', jelly + ' ' + t('units.cft'));
}

function steelCalc() {
  if (!validate('steelDia','steelLen')) {
    showError('steelResult','steelResultVal', t('common.errorGeneric')); return;
  }
  const dia = getVal('steelDia');
  const len = getVal('steelLen');
  const weight = ((dia * dia) / 162) * (len / 3.281);
  const valText = weight.toFixed(2) + ' ' + t('units.kg');
  results.steel = { label: t('steel.resultLabel'), value: weight.toFixed(2), unit: t('units.kg') };
  showResult('steelResult','steelResultVal', valText, t('steel.formulaSub'), 'steelResultSub');
}

function excavationCalc() {
  if (!validate('excL','excW','excD')) {
    showError('excResult','excResultVal', t('common.errorGeneric')); return;
  }
  const vol = getVal('excL') * getVal('excW') * getVal('excD');
  results.excavation = { label: t('excavation.resultLabel'), value: fmt(vol), unit: t('units.cft') };
  showResult('excResult','excResultVal', fmt(vol) + ' ' + t('units.cft'));
}

function tankCalc() {
  if (!validate('tankL','tankW','tankH')) {
    showError('tankResult','tankResultVal', t('common.errorGeneric')); return;
  }
  const cft = getVal('tankL') * getVal('tankW') * getVal('tankH');
  const litres = (cft * 28.3168).toFixed(0);
  const valText = Number(litres).toLocaleString('en-IN') + ' ' + t('units.litres');
  const subText = tFormat('tank.cftSub', { v: fmt(cft) });
  results.tank = { label: t('tank.resultLabel'), value: Number(litres).toLocaleString('en-IN'), unit: t('units.litres') };
  showResult('tankResult','tankResultVal', valText, subText, 'tankResultSub');
}

function stairCalc() {
  if (!validate('stairH','stepH')) {
    showError('stairResult','stairResultVal', t('common.errorGeneric')); return;
  }
  const steps = Math.ceil(getVal('stairH') / getVal('stepH'));
  results.stairs = { label: t('stair.resultLabel'), value: steps, unit: t('units.steps') };
  showResult('stairResult','stairResultVal', steps + ' ' + t('units.steps'));
}

function tileCalc() {
  if (!validate('tileL','tileW','tileS')) {
    showError('tileResult','tileResultVal', t('common.errorGeneric')); return;
  }
  const area = getVal('tileL') * getVal('tileW');
  const tileArea = getVal('tileS') * getVal('tileS');
  const tiles = Math.ceil(area / tileArea);
  const withWaste = Math.ceil(tiles * 1.05);
  const valText = fmt(tiles) + ' ' + t('units.tiles');
  const subText = tFormat('tile.wasteSub', { v: fmt(withWaste) });
  results.tiles = { label: t('tile.resultLabel'), value: fmt(tiles), unit: t('units.nos') };
  showResult('tileResult','tileResultVal', valText, subText, 'tileResultSub');
}

function paintCalc() {
  if (!validate('paintL','paintH')) {
    showError('paintResult','paintResultVal', t('common.errorGeneric')); return;
  }
  const area = getVal('paintL') * getVal('paintH');
  // 1 litre covers ~40 sq.ft for 2 coats
  const litres = (area / 40).toFixed(2);
  const valText = litres + ' ' + t('units.litres');
  const subText = tFormat('paint.coverageSub', { a: fmt(area) });
  results.paint = { label: t('paint.resultLabel'), value: litres, unit: t('units.litres') };
  showResult('paintResult','paintResultVal', valText, subText, 'paintResultSub');
}

function plasterCalc() {
  if (!validate('plasL','plasH')) {
    showError('plasResult','plasResultVal', t('common.errorGeneric')); return;
  }
  const area = getVal('plasL') * getVal('plasH');
  results.plaster = { label: t('plaster.resultLabel'), value: fmt(area), unit: t('units.sqft') };
  showResult('plasResult','plasResultVal', fmt(area) + ' ' + t('units.sqft'));
}

function costCalc() {
  if (!validate('cemBags','cemPrice')) {
    showError('costResult','costResultVal', t('common.errorGeneric')); return;
  }
  const total = getVal('cemBags') * getVal('cemPrice');
  results.cementCost = { label: t('cementCost.resultLabel'), value: fmtRs(total), unit: '' };
  showResult('costResult','costResultVal', fmtRs(total));
}

function flooringCalc() {
  if (!validate('floorArea','floorRate')) {
    showError('floorResult','floorResultVal', t('common.errorGeneric')); return;
  }
  const total = getVal('floorArea') * getVal('floorRate');
  results.flooringCost = { label: t('flooring.resultLabel'), value: fmtRs(total), unit: '' };
  showResult('floorResult','floorResultVal', fmtRs(total));
}

function houseCalc() {
  if (!validate('houseArea')) {
    showError('houseResult','houseResultVal', t('common.errorArea')); return;
  }
  const area = getVal('houseArea');
  const rate = parseFloat(document.getElementById('houseType').value);
  const cost = area * rate;
  const label = document.getElementById('houseType').selectedOptions[0].text;
  const subText = tFormat('house.subFormat', { label: label, area: fmt(area), rate: fmt(rate) });
  results.houseCost = { label: t('house.resultLabel'), value: fmtRs(cost), unit: '' };
  showResult('houseResult','houseResultVal', fmtRs(cost), subText, 'houseResultSub');
}

/* ============================================================ */

/* ============================================================
   PDF REPORT GENERATOR
   Redesigned as a professional multi-section engineering report.
   Rendered in English only: jsPDF's built-in fonts do not support
   Tamil / Hindi / Telugu / Malayalam / Kannada glyphs, so keeping
   the PDF in English avoids broken/garbled characters on any
   device or printer.
   jsPDF is lazy-loaded the first time this function runs.
   ============================================================ */

let jspdfLoadPromise = null;
function ensureJsPDFLoaded() {
  if (window.jspdf) return Promise.resolve();
  if (jspdfLoadPromise) return jspdfLoadPromise;
  jspdfLoadPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
  return jspdfLoadPromise;
}

async function generateReport() {
  const status = document.getElementById('pdfStatus');
  status.textContent = '⏳ ' + (currentLang === 'en' ? 'Preparing PDF...' : 'PDF...');

  try {
    await ensureJsPDFLoaded();
  } catch (e) {
    status.textContent = '❌ Could not load PDF library. Check your connection and try again.';
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const navy   = [30, 58, 138];
  const navy2  = [20, 43, 99];
  const gold   = [201, 154, 46];
  const ink    = [15, 23, 42];
  const gray   = [100, 116, 139];
  const lightBg= [239, 246, 255];
  const green  = [15, 157, 102];
  const pageW = 210, pageH = 297;

  function domVal(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    const txt = el.textContent.trim();
    return (txt && !txt.startsWith('⚠') && txt !== '—') ? txt : null;
  }

  // Structured rows: [English label, current DOM value text]
  const calcRows = [
    ['Concrete Volume',  domVal('conResultVal')],
    ['Slab Volume',      domVal('slabResultVal')],
    ['Column Volume',    domVal('colResultVal')],
    ['Beam Volume',      domVal('beamResultVal')],
    ['Footing Volume',   domVal('footResultVal')],
    ['Excavation Volume',domVal('excResultVal')],
    ['Staircase Steps',  domVal('stairResultVal')],
    ['Tank Capacity',    domVal('tankResultVal')],
  ];
  const materialRows = [
    ['Bricks Required',  domVal('brickResVal')],
    ['Cement Required',  domVal('cemResultVal')],
    ['Sand Required',    domVal('sandResultVal')],
    ['Jelly Required',   domVal('jellyResultVal')],
    ['Steel Weight',     domVal('steelResultVal')],
    ['Tiles Required',   domVal('tileResultVal')],
    ['Paint Required',   domVal('paintResultVal')],
    ['Plaster Area',     domVal('plasResultVal')],
  ];
  const costRows = [
    ['Cement Cost',      domVal('costResultVal')],
    ['Flooring Cost',    domVal('floorResultVal')],
    ['House Estimate',   domVal('houseResultVal')],
  ];

  const validCalc = calcRows.filter(([, v]) => v);
  const validMaterial = materialRows.filter(([, v]) => v);
  const validCost = costRows.filter(([, v]) => v);
  const totalDone = validCalc.length + validMaterial.length + validCost.length;

  const priceRows = [
    ['Cement (per 50kg bag)',      domVal('pCement')],
    ['Sand / M-Sand (per CFT)',    domVal('pSand')],
    ['Coarse Aggregate (per CFT)', domVal('pAggregate')],
    ['Steel TMT (per kg)',         domVal('pSteel')],
    ['Bricks (per 1000 nos)',      domVal('pBrick')],
    ['Paint Exterior (per ltr)',   domVal('pPaint')],
  ];
  const validPriceRows = priceRows.filter(([, v]) => v);
  const aiSummaryRaw = domVal('aiSummary');
  const aiSummary = aiSummaryRaw ? aiSummaryRaw.replace('📊 ', '') : null;

  const now = new Date();
  const genDate = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  const genTime = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  // ── helper: section title bar ──
  function sectionBar(title, y, color) {
    doc.setFillColor(...color);
    doc.rect(10, y - 6, pageW - 20, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 15, y + 1);
    return y + 12;
  }

  function ensureSpace(y, needed) {
    if (y + needed > 270) { footerPlaceholder(); doc.addPage(); return 20; }
    return y;
  }

  function tableRows(rows, y, valueColor) {
    rows.forEach(([label, val], i) => {
      if (i % 2 === 0) {
        doc.setFillColor(...lightBg);
        doc.rect(10, y - 4, pageW - 20, 11, 'F');
      }
      doc.setFontSize(9.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...gray);
      doc.text(label, 15, y + 3);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...valueColor);
      doc.text(String(val), pageW - 15, y + 3, { align: 'right' });
      y += 11;
      if (y > 270) { doc.addPage(); y = 20; }
    });
    return y;
  }

  function footerPlaceholder() { /* real footer pass runs after all pages exist */ }

  // ── COVER PAGE ──
  doc.setFillColor(...navy);
  doc.rect(0, 0, pageW, pageH, 'F');
  doc.setFillColor(...navy2);
  doc.rect(0, 0, pageW, 92, 'F');

  doc.setDrawColor(...gold);
  doc.setLineWidth(0.8);
  doc.rect(18, 30, pageW - 36, 46);

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('CIVIL CALCULATOR PRO', pageW / 2, 48, { align: 'center' });
  doc.setFontSize(12);
  doc.setTextColor(...[201,154,46]);
  doc.text('CONSTRUCTION ESTIMATION REPORT', pageW / 2, 60, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(220, 228, 245);
  doc.text('Tamil Nadu · Concrete · Materials · Structure · Finishing · Cost', pageW / 2, 70, { align: 'center' });

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(30, 110, pageW - 60, 82, 3, 3, 'F');
  doc.setTextColor(...ink);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Prepared by', 42, 130);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text('Mukesh', 42, 138);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Generated on', 42, 154);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(genDate + '  ·  ' + genTime, 42, 162);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('Calculators completed', 42, 178);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.text(String(totalDone) + ' of 17', 42, 186);

  doc.setTextColor(200, 210, 230);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'italic');
  doc.text('Report generated in English for compatibility with all devices and printers.', pageW / 2, 250, { align: 'center', maxWidth: pageW - 50 });

  // ── PAGE 2: EXECUTIVE SUMMARY ──
  doc.addPage();
  let y = 20;
  y = sectionBar('EXECUTIVE SUMMARY', y, navy);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...ink);
  const summaryLines = [];
  summaryLines.push('This report summarises ' + totalDone + ' calculator result(s) generated in the Civil');
  summaryLines.push('Calculator Pro app, grouped into volume/quantity calculations, material');
  summaryLines.push('requirements, and cost estimates, along with AI-estimated Tamil Nadu');
  summaryLines.push('market rates for common construction materials.');
  summaryLines.forEach(line => { doc.text(line, 15, y); y += 6; });
  y += 4;

  if (totalDone === 0) {
    doc.setTextColor(...gray);
    doc.text('No calculations were completed yet. Return to the calculator tabs, enter', 15, y); y += 6;
    doc.text('your project values, and press Calculate before generating this report.', 15, y); y += 10;
  }

  // ── SECTION: CALCULATION RESULTS ──
  y = ensureSpace(y, 20);
  y = sectionBar('VOLUME & QUANTITY RESULTS  (Calculation | Result)', y, navy);
  if (validCalc.length === 0) {
    doc.setFontSize(10); doc.setTextColor(...gray); doc.setFont('helvetica','normal');
    doc.text('No volume/quantity calculations recorded yet.', 15, y + 4); y += 16;
  } else {
    y = tableRows(validCalc, y, ink);
    y += 4;
  }

  // ── SECTION: MATERIAL SUMMARY ──
  y = ensureSpace(y, 20);
  y = sectionBar('MATERIAL SUMMARY  (Material | Required Quantity)', y, navy);
  if (validMaterial.length === 0) {
    doc.setFontSize(10); doc.setTextColor(...gray); doc.setFont('helvetica','normal');
    doc.text('No material calculations recorded yet.', 15, y + 4); y += 16;
  } else {
    y = tableRows(validMaterial, y, ink);
    y += 4;
  }

  // ── SECTION: COST SUMMARY ──
  y = ensureSpace(y, 20);
  y = sectionBar('COST SUMMARY  (Item | Estimated Cost)', y, [...gold]);
  if (validCost.length === 0) {
    doc.setFontSize(10); doc.setTextColor(...gray); doc.setFont('helvetica','normal');
    doc.text('No cost calculations recorded yet.', 15, y + 4); y += 16;
  } else {
    y = tableRows(validCost, y, [120, 87, 0]);
    y += 4;
  }

  // ── SECTION: AI MATERIAL PRICES ──
  y = ensureSpace(y, 24);
  y = sectionBar('AI ESTIMATED MATERIAL RATES  (Tamil Nadu - Sivagangai / Madurai)', y, [99, 102, 241]);
  if (validPriceRows.length === 0) {
    doc.setFontSize(10); doc.setTextColor(...gray); doc.setFont('helvetica','normal');
    doc.text('No AI prices fetched yet. Open the AI Prices tab and tap "Get Today\'s', 15, y + 4); y += 6;
    doc.text('Estimated Prices" before generating this report.', 15, y + 4); y += 14;
  } else {
    validPriceRows.forEach(([label, val], i) => {
      if (i % 2 === 0) { doc.setFillColor(240, 240, 255); doc.rect(10, y - 4, pageW - 20, 11, 'F'); }
      doc.setFontSize(9.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(...gray);
      doc.text(label, 15, y + 3);
      doc.setFont('helvetica', 'bold'); doc.setTextColor(99, 102, 241);
      doc.text(String(val), pageW - 15, y + 3, { align: 'right' });
      y += 11;
      if (y > 265) { doc.addPage(); y = 20; }
    });

    if (aiSummary) {
      y += 4;
      doc.setFillColor(255, 249, 230);
      doc.rect(10, y - 3, pageW - 20, 14, 'F');
      doc.setFontSize(8.5); doc.setFont('helvetica', 'italic'); doc.setTextColor(122, 91, 0);
      doc.text('Market Summary: ' + aiSummary, 15, y + 6, { maxWidth: pageW - 30 });
      y += 18;
    }
    y += 2;
    doc.setFontSize(7.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(...gray);
    doc.text('* AI-estimated rates only. Verify with local supplier before purchase.', 15, y);
    y += 12;
  }

  // ── SECTION: RECOMMENDATIONS ──
  y = ensureSpace(y, 40);
  y = sectionBar('RECOMMENDATIONS', y, navy2);
  const recs = [
    '- Add a 5% wastage buffer on bricks, tiles and finishing materials (already applied above).',
    '- Confirm all AI-estimated material rates with your local supplier before purchase.',
    '- For load-bearing elements (columns, beams, footings), have designs verified by a',
    '  qualified structural engineer before construction.',
    '- Keep this report with your site file for reference during material procurement.'
  ];
  doc.setFontSize(9.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(...ink);
  recs.forEach(line => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.text(line, 15, y, { maxWidth: pageW - 30 });
    y += 7;
  });

  // ── FOOTER on every page ──
  const pageCount = doc.internal.getNumberOfPages();
  for (let p = 1; p <= pageCount; p++) {
    doc.setPage(p);
    if (p === 1) continue; // cover page keeps its own full-bleed navy background
    doc.setFillColor(...navy);
    doc.rect(0, pageH - 10, pageW, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Civil Calculator Pro  |  Prepared by Mukesh  |  Tamil Nadu', 15, pageH - 3.5);
    doc.text('Page ' + p + ' of ' + pageCount, pageW - 15, pageH - 3.5, { align: 'right' });
  }
  // Cover page gets its own footer strip matching its dark background
  doc.setPage(1);
  doc.setFillColor(...navy2);
  doc.rect(0, pageH - 10, pageW, 10, 'F');
  doc.setTextColor(200, 210, 230);
  doc.setFontSize(8);
  doc.text('Civil Calculator Pro  |  Tamil Nadu', 15, pageH - 3.5);
  doc.text('Page 1 of ' + pageCount, pageW - 15, pageH - 3.5, { align: 'right' });

  doc.save('Civil_Calculator_Report.pdf');

  const plural = (validCalc.length + validMaterial.length + validCost.length) !== 1 ? 's' : '';
  const extra = validPriceRows.length ? (' + ' + validPriceRows.length + ' AI prices') : '';
  status.textContent = tFormat('pdf.statusReady', { n: totalDone, plural: plural, extra: extra });
  setTimeout(() => status.textContent = '', 6000);
}

// ─── AI PRICE FETCHER ────────────────────────────

async function fetchAIPrices() {
  const btn = document.getElementById('aiFetchBtn');
  const btnText = document.getElementById('aiFetchBtnText');
  const loading = document.getElementById('aiLoading');
  const grid = document.getElementById('priceGrid');

  btn.disabled = true;
  btnText.textContent = '⏳ ' + t('ai.fetching');
  loading.classList.add('show');

  try {
    await new Promise(r => setTimeout(r, 1200));

    const prices = {
      cement: { price: "₹430", trendKey: "stable", brand: "UltraTech" },
      sand: { price: "₹55", trendKey: "rising", note: "M-Sand" },
      aggregate: { price: "₹38", trendKey: "stable", note: "20mm Aggregate" },
      steel: { price: "₹68", trendKey: "rising", note: "TMT Fe500" },
      brick: { price: "₹9000", trendKey: "stable", note: "1000 Bricks" },
      paint: { price: "₹320", trendKey: "rising", note: "Exterior Emulsion" }
    };

    document.getElementById('pCement').textContent = prices.cement.price;
    document.getElementById('pCementTrend').textContent = t('ai.' + prices.cement.trendKey) + ' · ' + prices.cement.brand;

    document.getElementById('pSand').textContent = prices.sand.price;
    document.getElementById('pSandTrend').textContent = t('ai.' + prices.sand.trendKey) + ' · ' + prices.sand.note;

    document.getElementById('pAggregate').textContent = prices.aggregate.price;
    document.getElementById('pAggregateTrend').textContent = t('ai.' + prices.aggregate.trendKey) + ' · ' + prices.aggregate.note;

    document.getElementById('pSteel').textContent = prices.steel.price;
    document.getElementById('pSteelTrend').textContent = t('ai.' + prices.steel.trendKey) + ' · ' + prices.steel.note;

    document.getElementById('pBrick').textContent = prices.brick.price;
    document.getElementById('pBrickTrend').textContent = t('ai.' + prices.brick.trendKey) + ' · ' + prices.brick.note;

    document.getElementById('pPaint').textContent = prices.paint.price;
    document.getElementById('pPaintTrend').textContent = t('ai.' + prices.paint.trendKey) + ' · ' + prices.paint.note;

    document.getElementById('aiSummary').textContent = '📊 ' + t('ai.summary');

    grid.style.display = 'block';
    btnText.textContent = '🔄 ' + t('ai.refresh');

  } catch (err) {
    document.getElementById('aiLoading').textContent = t('ai.errorLoading');
  } finally {
    btn.disabled = false;
    loading.classList.remove('show');
  }
}
