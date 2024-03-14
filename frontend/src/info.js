import Info from "./pages/Info/Info";

export const PaymentAndDeliveryTitle = ({lang}) => lang === 'ua'
	? "Оплата і доставка"
	: "Payment and Delivery"
export const PaymentAndDeliveryText = ({lang}) => lang === 'ua'
	? <>


	</>
	: <>

	</>

export const ReturnsAndExchangeTitle = ({lang}) => lang === 'ua'
	? "Повернення та обмін"
	: "Returns"
export const ReturnsAndExchangeText = ({lang}) => lang === 'ua'
	? <>


	</>
	: <>

	</>

export const PrivacyPolicyTitle = ({lang}) => lang === 'ua'
	? "Політика Конфіденційності"
	: "Privacy Policy"
export const PrivacyPolicyText = ({lang}) => lang === 'ua'
	? <>

	</>
	: <>

	</>


export const translations = {
	header: {
		aboutUs: {
			ua: "Про Нас",
			en: "About Us",
		},
		shop: {
			ua: "Магазин",
			en: "Shop",
		},
		chat: {
			en: "Chat",
			ua: "Чат",
		}
	},
	main: {
		utp: {
			ua: "«Назва SHTOR походить від мого прізвища та є ідеальним симбіозом цінностей, які батьки заклали у виховання. Батько казав: «Правда - гарний шлях до реального себе, без ілюзій і гарних слів.» Це не завжди легко збагнути. Але що б ми робили, якби у нашому житті не було одночасно і чорного і білого. Саме тому, чорний і білий - основні кольори, які використовуються у позиціонуванні.\nМама ж займає вагоме місце в моєму житті. Вона познайомила мене з мистецтвом, і навчила бачити цей світ прекрасним.\n\nНад ідеєю я замислилась під час перегляду старих родинних фотографій, коли я випадково натрапила на знімок моєї мами. На фото їй тільки 16 років, вона ще не поїхала зі свого маленького рідного села, але вже сповнена віри у себе та майбутнє. Найбільше мене вразив її сильний погляд сповнений цілковитою свободою. І саме цей образ самобутності покладений у бренд.»\n\n-Галина Штор, власниця бренду ",
			en: "The name SHTOR comes from my surname and is a perfect symbiosis of my parents and the values they instilled in me. My father always said: \"The truth is a good way to the real you, without illusions and pretty words.\" This is not always easy to understand. But what would we do without black and white in our lives? That is why black and white are the primary colors used in the brand positioning.\nAs for my mother, she taught me to see this world as beautiful, introduced me to art, and supported me in all my wildest desires.\n\nAs for the idea, it came to my mind while looking through old family photos when I came across a picture of my mother. In the shot, she was only 16 years old and still living in a small village. But she was full of faith in herself and the future. And what struck me the most was her intense look, a whole of complete freedom. This image of identity is embodied in the brand.»\n\n-Galina Shtor, the brand owner",
		}
	},
	footer: {
		thanksSubscribe: {
			en: 'Thanks for subscribing',
			ua: 'Дякуємо за підписку'
		},
		tryAgain: {
			en: 'Try again',
			ua: 'Спробуйте ще',
		},
		stayInformed: {
			en: 'Stay informed about releases and special events',
			ua: 'Будь в курсі випусків і спеціальних подій',
		}
	},
	infoPages: {
		thankYou: {
			title: {
				ua: "Дякуємо за замовлення ❤️",
				en: "Thank you for ordering ❤️"
			},
			text: {
				ua: "Чекайте email з tracking номером.",
				en: "Wait for email with tracking number."
			},
		},
		thankYouSubscribe: {
			title: {
				ua: "Дякуємо за підписку ❤️",
				en: "Thank you for subscribing ❤️"
			},
			text: {
				ua: "Ви успішно підписалися на наші новини.",
				en: "You have successfully subscribed to our newsletter."
			},
		},
		care: {
			title: {
				ua: "Догляд",
				en: "Care"
			},
			text : {
				ua: <>
					<p>- Знімайте прикраси перед контактом з водою та початком процедур по догляду за шкірою обличчя та рук;</p>
					<p>- Не розпилюйте парфуми, лак для волосся та інші хімічні речовини безпосередньо на виріб;</p>
					<p>- Уникати взаємодії виробу з лужними миючими засобами, речовинами, що містять хлор і йод, кремами та мазями;</p>
					<p>- Після кожного використання прикрас необхідно їх протирати м’якою тканиною без ворсу;</p>
					<p>- Зберігати прикраси потрібно в мішечках, окремо від інших;</p>
					<p>- Намагайтесь щоб вироби не торкались будь-яких твердих матеріалів, таких як метал;</p>
					<p>- Під час чистки виробів не користуйтесь водою, будь-якими полірувальними засобами які містять в собі спирт, або ультразвуковими полірувальними засобами;</p>
					<p>- Не мийте вироби з перлинами - ніжна очистка м’якою тканиною без ворсу буде достатньою;</p>
					<p>- Метал та природні камені необхідно чистити тільки сухою тканиною та м’якою щіточкою;</p>
					<p>- Надягати прикраси слід в останню чергу -коли Ви вже одягнені.</p>
				</>,
				en: <>
					<p>Exchange and return of products are possible within 14 days after receiving the order.To arrange a return or an exchange of goods, please contact us at: info@shtor.com.ua</p>
					<p>Make sure that the returned product has not been used, is placed in its original packaging, and contains original tags, price tags, and all additional attachments.</p>
					<ul>
						<li>We reserve the right to refuse returns or exchanges if the item does not comply with the above-mentioned rules.</li>
					</ul>
					<p>Goods from the OUTLET section and products made according to individual measurements are not subject to return and exchange.</p>
					<p>You can use any express delivery service for a return (please note that the delivery time should NOT exceed 10 days). SHTOR is not responsible for return shipping costs and customs duties.</p>
					<p>After dispatching the package, please let us know the tracking number of the parcel and leave a link to the tracking website.</p>
					<p>Any disputes which do not fall under the Returns and Exchange policy are subject to individual resolvement through negotiation between the parties involved.</p>
				</>
			}
		},
		paymentDelivery: {
			title: {
				ua: "Оплата і доставка",
				en: "Payment and delivery"
			},
			text: {
				ua: <>
					<p><strong>Шановні клієнти,</strong></p>
					<p><strong>Зверніть увагу, що всі відправлення здійснюються з нашого складу в Одесі (Україна). У зв'язку з війною в нашій країні визначні зміни в термінах доставки. Виготовлення товару триватиме до 10 робочих днів. Зверніть увагу, що бренд не несе відповідальності за місцеві податки.</strong></p>
					<ul>
						<li>ДОСТАВКА В РОСІЮ ТА БІЛОРУСЬ НЕ ДОСТУПНА. Молимося за мир! Стоїмо з Україною!</li>
					</ul>
					<p><strong>Міжнародні замовлення:</strong></p>
					<p>Усі міжнародні замовлення відправляються службою Укрпошта та DHL Express.</p>
					<ul>
						<li>Стандартна доставка - $30 (10-20 робочих днів)</li>
						<li>Експрес-доставка - $60 (5-10 робочих днів)</li>
					</ul>
					<p><strong>Україна:</strong></p>
					<p>Всі замовлення по Україні будуть доставлені службою «Нова Пошта». Термін доставки під час воєнного стану 2-5 робочих днів.</p>
					<p>Безкоштовна доставка</p>
				</>,
				en: <>
					<p>Dear customers,</p>
					<p>Please note that all shipments are from our warehouse in Odesa (Ukraine). Due to the war in our country, there are slight changes in delivery terms.The production of the item will take till 10 business days. Please note that the brand is not responsible for local taxes.</p>
					<ul>
						<li>DELIVERY TO RUSSIA AND BELARUS IS NOT AVAILABLE. We are praying for peace!Stand with Ukraine!</li>
					</ul>
					<p><strong>International orders:</strong></p>
					<p>All international orders will be shipped by Ukrposhta service and DHL Express.</p>
					<ul>
						<li>Standard delivery - $30 (10-20 business days)</li>
						<li>Express delivery - $60 (5-10 business days)</li>
					</ul>
					<p><strong>Ukraine:</strong></p>
					<p>All orders within Ukraine we will be delivered via the Nova Poshta service. The delivery time during martial law is 2-5 business days.</p>
					<p>Free delivery</p>
				</>
			}
		},
		returnsExchange: {
			title: {
				ua: "Повернення та обмін",
				en: "Returns and Delivery"
			},
			text: {
				ua: <>
					<p>Обмін і повернення товару можливі протягом 14 днів після отримання замовлення. Для оформлення повернення або обміну товару, будь ласка, зв'яжіться з нами за адресою: info@shtor.com.ua</p>
					<p>Переконайтеся, що повернений товар не використовувався, він знаходиться в оригінальній упаковці та містить оригінальні бирки, цінники та всі додаткові вкладення.</p>
					<p>Ми залишаємо за собою право відмовити у поверненні або обміні, якщо товар не відповідає вищезазначеним правилам.</p>
					<ul>
						<li>Товари з розділу OUTLET та вироби, виготовлені за індивідуальними мірками, поверненню та обміну не підлягають.</li>
					</ul>
					<p>Ви можете скористатися будь-якою службою експрес-доставки для повернення (зверніть увагу, що термін доставки НЕ повинен перевищувати 10 днів). SHTOR не несе відповідальності за витрати на зворотну доставку та митні збори.</p>
					<p>Після відправлення посилки повідомте нам трек-номер посилки та залиште посилання на сайт відстеження.</p>
					<p>Будь-які суперечки, які не підпадають під політику повернення та обміну, підлягають індивідуальному вирішенню шляхом переговорів між залученими сторонами.</p>
				</>,
				en: <>
					<p>Exchange and return of products are possible within 14 days after receiving the order. To arrange a return or an exchange of goods, please contact us at: info@shtor.com.ua</p>
					<p>Make sure that the returned product has not been used, is placed in its original packaging, and contains original tags, price tags, and all additional attachments.</p>
					<p>We reserve the right to refuse returns or exchanges if the item does not comply with the above-mentioned rules.</p>
					<ul>
						<li>Goods from the OUTLET section and products made according to individual measurements are not subject to return and exchange.</li>
					</ul>
					<p>You can use any express delivery service for a return (please note that the delivery time should NOT exceed 10 days). SHTOR is not responsible for return shipping costs and customs duties.</p>
					<p>After dispatching the package, please let us know the tracking number of the parcel and leave a link to the tracking website.</p>
					<p>Any disputes which do not fall under the Returns and Exchange policy are subject to individual resolvement through negotiation between the parties involved.</p>
				</>
			}
		},
		privacyPolicy: {
			title: {
				ua: "Політика Конфіденційності",
				en: "Privacy Policy"
			},
			text: {
				ua: <>
					<p>SHTOR усвідомлює важливість захисту конфіденційності ваших персональних даних. Ми запровадили сувору політику та заходи безпеки для захисту інформації, яку ви нам надаєте.</p>
					<ol>
						<li>Дані збираються, коли ви робите покупки на нашому веб-сайті або використовуєте наші онлайн-сервіси</li>
					</ol>
					<p><strong>Контактна інформація:</strong> Якщо ви робите покупку онлайн, ми отримаємо ваше ім’я, адресу, адресу електронної пошти, номер телефону та країну проживання. Ми використовуватимемо вашу контактну інформацію, щоб:</p>
					<ul>
						<li>Обробляти ваші покупки/замовлення та будь-які повернення, обміни та скарги, які можуть виникнути щодо вашої покупки</li>
						<li>Спілкуватися з вами щодо вашої покупки, відповідати на будь-які запитання чи коментарі, які можуть виникнути щодо наших продуктів або послуг, і керувати ними. Юридична підстава полягає в тому, що обробка ваших даних необхідна для того, щоб ми могли виконати наші договірні зобов’язання перед вами за договором купівлі-продажу. Ми зберігатимемо ваші дані стільки часу, скільки необхідно для цієї мети. Ми також можемо обробляти ваші контактні дані, щоб інформувати вас електронною поштою, SMS, листами, телефоном, WeChat, Whatsapp та іншими соціальними мережами про наші спеціальні події чи акції. Ви маєте право відхилити наші маркетингові повідомлення в будь-який час, натиснувши посилання для скасування підписки в кожному повідомленні або зв’язавшись зі службою підтримки клієнтів за адресою info@shtor.com.ua</li>
					</ul>
					<p>Дані кредитної картки: Якщо ви робите покупку в Інтернеті та вирішуєте оплатити кредитною карткою, ви надасте інформацію про свою кредитну картку на нашому веб-сайті, щоб завершити покупку. Дані вашої кредитної картки будуть захищені за допомогою Global Sign Encryption. Усі платежі на сайті здійснюються платіжною системою FONDY.</p>
					<p><strong>Інформаційні листи</strong></p>
					<ul>
						<li><strong>Інформаційні листи</strong></li>
					</ul>
					<p>Якщо ви підписалися на одну з наших інформаційних бюлетенів, ми обробимо ваше ім’я, адресу електронної пошти, країну та інформацію про те, чи цікавитеся ви жіночим чи чоловічим одягом, з метою розсилки такого інформаційного бюлетеня. Ви маєте право скасувати підписку на нашу розсилку в будь-який час, натиснувши посилання для скасування підписки, яке міститься в кожній розсилці, або зв’язавшись зі службою підтримки клієнтів за адресою info@shtor.com.ua</p>
				</>,
				en: <>
					<p>SHTOR recognizes the importance of protecting the privacy of your personal data. We have instituted strict policies and security measures to protect the information you provide us.</p>
					<ol>
						<li>Data is collected when you shop on our website or use our online services</li>
					</ol>
					<p><strong>Contact details:</strong> If you make a purchase online we will collect your name, address, e-mail address, telephone number, and country of residence. We will use your contact information to:</p>
					<ul>
						<li>Process your purchase/orders and any returns, exchanges and complaints you may have relating to your purchase</li>
						<li>Communicate with you regarding your purchase and answer and administer any questions or comments you may have regarding our products or services. The legal basis is that it is necessary to process your data in order for us to be able to fulfill our contractual obligations to you under the purchase agreement. We will retain your data for as long as necessary for this purpose. We may also process your contact details to keep you informed, via email, SMS, letters, telephone, WeChat, Whatsapp and other social media, of our special events or promotions. You are entitled to reject our marketing messages at any time by clicking on the unsubscribe link included in each message or by contacting customer service at info@shtor.com.ua</li>
					</ul>
					<p>Credit card details: If you make a purchase online and choose to pay by credit card, you will provide your credit card information on our website to finalize your purchase. Your credit card details will be protected using Global Sign Encryption. All the payments on the website are carried out by FONDY Payment System.</p>
					<p>Newsletter</p>
					<ul>
						<li><strong>Newsletter</strong></li>
					</ul>
					<p>If you have subscribed to one of our newsletters, we will process your name, email address, country and information on whether you are interested in womenswear or menswear for the purpose of sending out such a newsletter. You are entitled to unsubscribe to our newsletter at any time by clicking on the unsubscribe link included in each newsletter or by contacting customer service at info@shtor.com.ua </p>
				</>
			}
		}
	},
	product: {
		description: {
			ua: "Опис",
			en: "Description",
		},
		silverAttachDesc: {
			ua: "Срібний ланцюг з регульованою довжіною 65см і 80см\n",
			en: "Silver chain with adjustable length 65cm and 80cm\n",
		},
		size: {
			title: {
				ua: "Розмір",
				en: "Size",
			},
			cm: {
				ua: "см",
				en: "cm",
			}
		},
		main: {
			ua: 'Головна',
			en: 'Home'
		},
		currency: {
			ua: '₴',
			en: '$'
		},
		color: {
			"Black": {
				ua: 'Чорний',
				en: 'Black'
			},
			"Dark Brown": {
				ua: 'Темно Коричневий',
				en: 'Dark Brown'
			},
			"Brown": {
				ua: 'Коричневий',
				en: 'Brown'
			},
		},
		attachment: {
			"Без підвісу": {
				ua: 'Без підвісу',
				en: 'No attachment'
			},
			"Срібний ланцюг": {
				ua: 'Срібний ланцюг',
				en: 'Silver chain'
			},
			"Срібна орбіта": {
				ua: 'Срібна орбіта',
				en: 'Silver orbit'
			},
		},
		addToCart: {
			ua: 'Додати у кошик',
			en: 'Add to cart'
		},
		outOfStock: {
			ua: 'Немає в наявності',
			en: 'Out of stock',
		},
	},
	cart: {
		title: {
			ua: 'Кошик',
			en: 'Cart'
		},
		delete: {
			ua: 'Ви впевнені, що хочете видалити',
			en: 'Are you sure you want to delete'
		},
		copy: {
			ua: 'Ви впевнені, що хочете скопіювати',
			en: 'Are you sure you want to copy'
		},
		deliveryHint: {
			ua: 'Доставка, податки та коди знижки розраховуються під час оформлення замовлення.',
			en: 'Shopping,taxes and discount codes calculated at checkout.',
		},
		fromCart: {
			ua: 'з вашого кошика ?',
			en: 'from your cart ?',
		},
		empty: {
			ua: 'Ваш кошик зараз порожній',
			en: 'Your cart is currently empty'
		},
		continueShopping: {
			ua: 'Продовжити покупки',
			en: 'Continue shopping'
		},
		subTotal: {
			ua: 'Проміжний підсумок',
			en: 'Subtotal'
		},
		total: {
			ua: 'Всього',
			en: 'Total'
		},
		checkOut: {
			ua: 'Чек-аут',
			en: 'Check out'
		},
		deliveryAlert: {
			ua: 'Доставка, податки та коди знижки розраховуються під час оформлення замовлення.',
			en: 'Shopping,taxes and discount codes calculated at checkout.'
		},
		quantity: {
			ua: 'Кількість',
			en: 'Quantity'
		},
		delivery: {
			ua: 'Доставка',
			en: 'Shipping',
		},
		internationalDeliveryPrice: {
			ua: 1125,
			en: 30,
		},
		back: {
			ua: "Назад",
			en: "Back",
		},
		free: {
			ua: "Безкоштовно",
			en: "Free",
		},
		countryRegion: {
			ua: "Країна/Регіон",
			en: "Country/Region",
		},
		firstName: {
			ua: "Ім'я",
			en: "First Name",
		},
		lastName: {
			ua: "Прізвище",
			en: "Last Name",
		},
		address: {
			ua: "Адреса",
			en: "Address",
		},
		apartment: {
			ua: "Квартира, кабінет і т. д.",
			en: "Apartment, suite, etc.",
		},
		addApartment: {
			ua: "Додати квартиру, кабінет і т. д.",
			en: "Add apartment, suite, etc.",
		},
		postalCode: {
			ua: "Поштовий код",
			en: "Postal code",
		},
		city: {
			ua: "Місто",
			en: "City",
		},
		phone: {
			ua: "Телефон",
			en: "Phone",
		},
		shippingMethod: {
			ua: "Спосіб доставки",
			en: "Shipping method",
		},
		novaPost: {
			ua: "Нова Пошта (доставка тільки по Україні)",
			en: "NOVA POST (only for Ukraine shipping)",
		},
		billingAddress: {
			ua: "Платіжна адреса",
			en: "Billing address",
		},
		sameAsShipping: {
			ua: "Та ж, що й доставка",
			en: "Same as shipping address",
		},
		useDifferentBilling: {
			ua: "Використовувати іншу платіжну адресу",
			en: "Use a different billing address",
		},
		attachment: {
			ua: (attachment) => {
				if (attachment === 'Срібна орбіта') return "зі срібною орбітою"
				if (attachment === 'Срібний ланцюг') return "зі срібним ланцюгом"
				return ""
			},
			en: (attachment) => {
				if (attachment === 'Срібна орбіта') return "with silver orbit"
				if (attachment === 'Срібний ланцюг') return "with silver chain"
				return ""
			},
		}
	},
	yes: {
		ua: "Так",
		en: "Yes",
	},
	no: {
		ua: "Ні",
		en: "No",
	},
	money: {
		eur: 'EUR',
		usd: 'USD',
		uah: 'UAH',
	},
	currencySymbol: {
		eur: '€',
		usd: '$',
		uah: '₴',
	},
}

export const countries = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"Andorra",
	"Angola",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bhutan",
	"Bolivia",
	"Bosnia and Herzegovina",
	"Botswana",
	"Brazil",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Central African Republic",
	"Chad",
	"Chile",
	"China",
	"Colombia",
	"Comoros",
	"Congo",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Cyprus",
	"Czech Republic",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"East Timor (Timor-Leste)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Fiji",
	"Finland",
	"France",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Greece",
	"Grenada",
	"Guatemala",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Honduras",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Israel",
	"Italy",
	"Ivory Coast",
	"Jamaica",
	"Japan",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Kosovo",
	"Kuwait",
	"Kyrgyzstan",
	"Laos",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Mauritania",
	"Mauritius",
	"Mexico",
	"Micronesia",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Morocco",
	"Mozambique",
	"Myanmar (Burma)",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"North Korea",
	"North Macedonia (Macedonia)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Poland",
	"Portugal",
	"Qatar",
	"Romania",
	"Russia",
	"Rwanda",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Korea",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Togo",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (UAE)",
	"United Kingdom (UK)",
	"United States of America (USA)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Vatican City (Holy See)",
	"Venezuela",
	"Vietnam",
	"Yemen",
	"Zambia",
	"Zimbabwe"
];
