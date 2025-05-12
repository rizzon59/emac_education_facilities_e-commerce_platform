
import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About EMAC Organization</h1>
          <p className="text-xl text-gray-600">
            Your trusted partner in educational materials supply
          </p>
        </div>
        
        <div className="mb-12">
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
            <img
              src="/placeholder.svg"
              alt="EMAC Organization team"
              className="w-full h-full object-cover"
            />
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            EMAC Organization was founded with a simple vision: to make quality educational materials accessible to all institutions. 
            What started as a small supplier for local schools has grown into a comprehensive educational materials provider serving 
            institutions across the region.
          </p>
          <p className="text-gray-700 mb-4">
            Our journey has been defined by our commitment to quality, reliability, and exceptional service. We understand 
            the importance of educational materials in shaping the future of students, and we take this responsibility seriously.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-700">
                To provide high-quality, affordable educational materials that enhance learning experiences and 
                contribute to academic success. We aim to be a reliable partner for educational institutions, 
                offering not just products but comprehensive educational solutions.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-700">
                To become the leading supplier of educational materials in the region, known for our quality, 
                innovation, and commitment to education. We envision a future where every student has access to 
                the best educational resources regardless of their location.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">What Sets Us Apart</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">Quality Focus</h3>
              <p className="text-gray-700">
                We source only the best materials that meet our strict quality standards, ensuring 
                durability and effectiveness.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Selection</h3>
              <p className="text-gray-700">
                From lab equipment to textbooks, we offer everything institutions need for a well-rounded educational experience.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">Customer Service</h3>
              <p className="text-gray-700">
                We prioritize your needs with responsive, helpful service and expert guidance on product selection.
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Reliable Delivery</h3>
              <p className="text-gray-700">
                We understand the importance of timely delivery and ensure your materials arrive when you need them.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="mb-4 h-32 w-32 mx-auto rounded-full overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Morrice Morrice"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Morrice Morrice</h3>
              <p className="text-gray-600">Senior CEO</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 h-32 w-32 mx-auto rounded-full overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Sarah Johnson</h3>
              <p className="text-gray-600">Operations Manager</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 h-32 w-32 mx-auto rounded-full overflow-hidden">
                <img
                  src="/placeholder.svg"
                  alt="Team Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Daniel Mwangi</h3>
              <p className="text-gray-600">Customer Relations</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Phone:</span>
                    <span>+255742777922</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Email:</span>
                    <span>info@emacorg.com</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">WhatsApp:</span>
                    <span>+255742777922</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium mr-2">Address:</span>
                    <span>123 Education Street, Dar es Salaam, Tanzania</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>9:00 AM - 2:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-gray-700">
                    For urgent inquiries outside business hours, please contact us via WhatsApp.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
