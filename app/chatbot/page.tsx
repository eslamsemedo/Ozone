import React from 'react'

const page = () => {
  return (
    <div>
      <div id="chatbotModal" className="modal">
        <div className="modal-content">
          {/* <span className="close"> &times;</span> */}
          <iframe
            src="https://www.chatbase.co/chatbot-iframe/WH3ptLNIzYZXbqddSdFk7"
            width="100%"
            height="400"
            style={{ border: 'none', borderRadius: '8px' }}>
          </iframe>
        </div>
      </div>
    </div>
  )
}

export default page
