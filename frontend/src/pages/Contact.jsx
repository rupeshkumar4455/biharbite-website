const Contact = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 min-h-[60vh]">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Contact Us
      </h2>

      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Have questions, feedback, or partnership inquiries?
        We’d love to hear from you.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* CONTACT DETAILS */}
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold mb-1">
              📍 Address
            </h4>
            <p className="text-gray-600">
              BiharBite, Bodhgaya,Gaya,Bihar India
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-1">
              📞 Phone
            </h4>
            <p className="text-gray-600">
              +91 6268947041
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-1">
              ✉️ Email
            </h4>
            <p className="text-gray-600">
              support@biharbite.com
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-1">
              ⏰ Support Hours
            </h4>
            <p className="text-gray-600">
              Monday – Saturday (10 AM – 6 PM)
            </p>
          </div>
        </div>

        {/* CONTACT MESSAGE (STATIC FOR NOW) */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h4 className="text-xl font-semibold mb-4">
            Send us a message
          </h4>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border p-2 rounded"
            />
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border p-2 rounded"
            ></textarea>

            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Send Message
            </button>

            <p className="text-xs text-gray-500">
              (Demo version – message sending disabled)
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
