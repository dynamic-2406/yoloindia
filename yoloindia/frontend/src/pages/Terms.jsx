import { Link } from 'react-router-dom';

const Terms = () => (
  <div className="min-h-screen bg-cream py-20">
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-[32px] shadow-card p-8 sm:p-12">
        <div className="mb-8">
          <p className="text-saffron-500 font-body font-semibold uppercase tracking-[0.2em] mb-3">Terms & Conditions</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900">Terms of Service</h1>
        </div>

        <div className="space-y-8 text-gray-700 font-body text-sm leading-relaxed">
          <section>
            <p>
              If you need to cancel your reservation, please send us an email at <a href="mailto:info@yoloindiatours.com" className="text-saffron-500">info@yoloindiatours.com</a> or <a href="mailto:yoloindiatour@gmail.com" className="text-saffron-500">yoloindiatour@gmail.com</a> and contact a Yolo India Tours Customer Service Representative.
            </p>
            <p>
              To receive any refund, if applicable, it will be processed within 35 days after our receipt of your written notice of cancellation.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Cancellation Policy</h2>
            <p>
              Traveler substitutions are considered reservation cancellations and are subject to cancellation fees. Please note that we do not make any refunds for any unused portion of your trip.
            </p>
            <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 text-sm text-gray-700">
                <div className="font-semibold">Before 30+ days</div>
                <div className="font-semibold">10% of Total Tour Cost</div>
                <div>Before 29-22 days</div>
                <div>30% of Total Tour Cost</div>
                <div>Before 21-16 days</div>
                <div>60% of Total Tour Cost</div>
                <div>Before 15-0 days</div>
                <div>100% of Total Tour Cost</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Form of Payment</h2>
            <p>
              You can elect to pay your reservation by using any of the following payment methods.
            </p>
            <ul className="mt-4 space-y-3 list-disc list-inside">
              <li>Cash, accepted in our offices only.</li>
              <li>
                Bank Account Deposit: You can pay for your tour through your banking institution. Monetary transfers within India will take approximately 3-4 days to be credited to an account in India. From outside India, normal bank transfers may take up to 15 days to be credited to an account in India. Swift bank transfers usually take 3-4 working days to arrive. Bookings will not be confirmed until funds have been credited to our account.
              </li>
              <li>
                Credit Card: Payment can be made online through our Secure Online Payment. Bank charges will be charged extra as per actual.
              </li>
            </ul>

            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <p className="font-semibold text-gray-900 mb-3">YOLO INDIA TOURS BANK DETAILS</p>
              <p>Name: YOLO INDIA TOURS</p>
              <p>Account number: 10253306694</p>
              <p>IFSC: IDFB0020139</p>
              <p>SWIFT code: IDFBINBBMUM</p>
              <p>Bank name: IDFC FIRST</p>
              <p>Branch: NEW DELHI - MALVIYA NAGAR BRANCH</p>
            </div>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Credit Card Terms</h2>
            <p>
              You consent to us supplying your billing, payment and identification information to third parties with whom you enter into transactions. We may also provide such personal information to third parties as is required to complete your booking.
            </p>
            <p>
              You authorize us to disclose your credit card details to, and obtain information from, any financial institution or credit card issuer to verify the credit card and identification details you have provided.
            </p>
            <p>
              You authorize us to take steps to confirm that there is sufficient credit on your credit card account to meet likely charges. Confirmation of booking will not be issued until authorization has been obtained from the relevant card company.
            </p>
            <p>
              You authorize us to charge all fees incurred to the credit card designated by you. If payment is not received for any reason, you agree to pay us all amounts due on demand.
            </p>
            <p>
              Confirmed bookings are subject to your credit card approval for the transaction. If the credit card is not approved, we will attempt to contact you but Yolo India Tours is not responsible for any subsequent non-provision of services in the event we are unable to establish contact with you.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Passport &amp; Visa</h2>
            <p>
              Clients must ensure that they allow adequate time to obtain their relevant passport and visa requirements. All foreign tourists visiting India must be in possession of a valid passport and visa. The passport must be valid for a period of at least 6 months at the time of entry to India.
            </p>
            <p>
              Visa can be obtained from Indian Consulates / Embassies in the country of your origin. There are also certain parts of India that require a special permit to visit. This will be advised to you at the time of booking the tour. Visa fees may vary by country.
            </p>
            <p>
              It is recommended to obtain a multiple entry tourist visa since this simplifies travel to neighboring countries like Nepal and Sri Lanka. Indians holding foreign passports would also have to obtain an Indian visa before entering India.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Health / Vaccinations</h2>
            <p>
              It is your responsibility to ensure that you are aware of any health requirements for your travel destination and to carry all necessary vaccination documentation.
            </p>
            <p>
              Tourists coming to India via Africa, South America, or any other yellow fever infected area must have a yellow fever vaccination certificate. No other vaccination certificate is mandatory though you may like to consult your doctor for professional advice prior to departure.
            </p>
            <p>
              Inoculations for cholera and hepatitis A, anti-malarial pills, and COVID-19 are recommended.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Travel Insurance</h2>
            <p>
              It is highly recommended that clients take out suitable travel insurance. Clients are wholly responsible for arranging their own insurance.
            </p>
            <p>
              A suitable insurance policy should provide adequate cover for medical expenses arising through illness or accident before or during the holiday and loss of holiday monies through cancellation and curtailment of the holiday for insurable reasons. Clients should ensure there are no exclusion clauses limiting protection for the type of activities in their tour.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Agent Responsibilities</h2>
            <p>
              It is the travel agent’s responsibility to ensure that all invoice and itinerary details and documentation issued by Yolo India Tours are correct and that the customer is aware of amendment and cancellation conditions and other clauses in these Booking Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Law of Contract</h2>
            <p>
              This contract is governed by the laws of the state of New Delhi and any legal action arising from it shall be litigated only in the appropriate court in that state having jurisdiction over that claim.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Single Travelers</h2>
            <p>
              Single travelers on group tours may avoid paying the Single Room Option by opting to travel on a ‘willing to share’ basis. Yolo India Tours will endeavor to match a single traveler with another suitable single traveler.
            </p>
            <p>
              If we are unable to confirm a share partner, Yolo India Tours will confirm a single room at all hotel accommodation and waive the Single Room Option. Single option fees are applicable for any rail or cruise components and cannot be waived.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Consular Advice</h2>
            <p>
              We recommend that you review information provided by the Australian Department of Foreign Affairs and Trade prior to making your booking by calling 1300 555 135 or visiting their website <a href="https://www.dfat.gov.au" target="_blank" rel="noreferrer" className="text-saffron-500">www.dfat.gov.au</a> for the latest information.
            </p>
            <p>
              We strongly recommend that you familiarize yourself with the latest Government Consular advice and information.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Responsibilities &amp; Liability</h2>
            <p>
              The responsibility of Yolo India Tours, its affiliated companies, officers/directors, employees, sponsoring organizations, and agents is strictly limited. As a tour operator, Yolo India Tours organizes, promotes and sells tour programs consisting of certain travel services, including sightseeing excursions, and hotel accommodation, that Yolo India Tours purchases or reserves from various suppliers (collectively, “Suppliers”).
            </p>
            <p>
              Yolo India Tours does not own or operate any of these Suppliers. The Suppliers providing travel services for Yolo India Tours tour programs are independent contractors, and are not agents or employees of Yolo India Tours. As such, Yolo India Tours is not responsible for direct, indirect, consequential, or incidental damage, injury, loss, accident, delay, or irregularity of any kind occasioned by reason of any act or omission beyond its control, including, without limitation, any negligent or willful act or failure to act of, or breach of contract by, any Supplier or any other third party.
            </p>
            <p>
              We strongly urge all customers to undertake a high level of personal responsibility in order to ensure that possessions, equipment and personal documents are closely monitored and always protected. Some tours include visits to shops and merchants. Yolo India Tours is not responsible for any purchases you make during your trip, whether that merchant is part of the scheduled itinerary.
            </p>
            <p>
              By utilizing the travel services of the Suppliers, you agree that you will look only to such Suppliers in respect of any accident, injury, property damage, or personal loss to you or to those traveling with you, and that neither Yolo India Tours nor any representative of Yolo India Tours shall be liable.
            </p>
            <p>
              Without limiting the foregoing, Yolo India Tours is not responsible for any losses or expenses due to delays or changes in schedules, overbooking or downgrading of accommodations, defaults by any third parties, including Suppliers, mechanical or other failure of trains or other means of transportation, or the failure of any transportation mechanism to arrive or depart on time.
            </p>
            <p>
              Yolo India Tours is not responsible for acts of God or force majeure events, sanitation problems, lack of medical care, sickness, weather conditions, strikes and other labor activities, acts of terrorism, acts of war (declared or undeclared), quarantines, embargoes, blockades, criminal activities or any other act or event beyond the direct control of Yolo India Tours.
            </p>
            <p>
              Yolo India Tours assumes no financial responsibility for any cancellations or delays resulting from invalid passports, visas, or other travel document requirements, or for ticket or other travel documents that do not reflect your name exactly as it appears on your passport. Yolo India Tours reserves the right to change the itinerary of the tour without prior notice. If the tour is cancelled by Yolo India Tours for any reason, Yolo India Tours shall have no liability beyond the prompt refund of all tour participants’ payments received by it.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Complaints or Claims</h2>
            <p>
              At Yolo India Tours we are committed to ensuring that we deal with complaints effectively and efficiently. Should the customer not be satisfied with any aspect of their arrangements they must immediately inform the National Escort or local guide who will endeavor to resolve the issue at the time.
            </p>
            <p>
              If this is not possible and you wish to lodge a complaint or claim, this must be done in writing to Yolo India Tours in New Delhi within 30 days of the completion of your Yolo India Tours arrangements. Relevant receipts and substantiating evidence must be attached to the letter of claim.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Important Notes</h2>
            <ul className="mt-4 space-y-3 list-disc list-inside">
              <li>The above package can be customized as per the customer’s requirement and budget. In case of any unprecedented hike in airfare, hotel charges or other service charges, the same will be levied extra.</li>
              <li>Check-in and check-out times are as per hotel policies. The hotel and services mentioned in the itinerary are subject to confirmation.</li>
              <li>Meal timings must be followed as per the instructed time of the hotels. For any unavailed meals, we shall not be responsible.</li>
              <li>We shall not be responsible for any cancellation of flights, cabs or buses due to bad weather and are not liable for it.</li>
              <li>In any hill station the facilities of hotel, services, and aids etc cannot be matched to developed destinations. Hotels are categorized on the basis of location, services and costing and not as per star categorization (1*, 2*, 3*, 4*, 5* and so on).</li>
              <li>You can check all the hotels quoted by our executive. If you want to change any hotel or upgrade service, the difference will be charged. Carefully check your confirmation; if you want any change, update us within 7 days of receiving the confirmation voucher.</li>
              <li>Changes are not possible at the last moment or at the time of check-in; it depends on availability with additional charges.</li>
              <li>We may have to reschedule sightseeing days due to the closing of any monument during that particular day to ensure smooth execution of tours.</li>
              <li>Extra cost would be applicable for any unforeseen event. Rates may change in the case of hotel rates, transport rates, government taxes or entrance fees.</li>
              <li>If any amount is committed on arrival, you have to pay it at the time of pickup.</li>
              <li>No discount will be provided after confirmation.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Jurisdiction</h2>
            <p>
              Yolo India Tours hereby expressly disclaims any implied warranties imposed by the laws of any jurisdiction of a country other than those where it operates its offices. For all complaints, suits, claims or disputes of whatever nature relating to any product including tours by Yolo India Tours, the courts and tribunals in Delhi, India alone shall have exclusive jurisdiction. All tours are subject to laws, rules of the RBI/Government of India.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-xl text-gray-900 mb-3">Holidays and Peak Season</h2>
            <p>
              During local or national holidays or special events, peak seasons, on Sundays, and during religious occasions, certain facilities such as museums, churches, restaurants, sightseeing tours, hotels, and shopping may be limited or not available. Alternatives will be offered whenever possible.
            </p>
            <p>
              Yolo India Tours cannot be held responsible for any closures, necessary itinerary changes or curtailments for any reason.
            </p>
            <p>
              We provide base category rooms in hotels. In hill stations we provide non-AC rooms and cab AC may also not work due to local conditions.
            </p>
          </section>

          <div className="pt-6 border-t border-gray-200">
            <p className="font-body text-sm text-gray-500">Need help? <Link to="/contact" className="text-saffron-500 hover:text-saffron-600">Contact us</Link>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Terms;
