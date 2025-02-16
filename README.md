# **Waste Wise**  

Waste Wise is a smart waste management platform designed to enhance waste segregation, encourage community participation through a points-based reward system, and optimize waste collection routes. The system allows users to upload waste images for automatic categorization and assists municipalities in optimizing bin pickup routes.

*Prepared during the Tynet Hackathon.*

## **Features**  

- **Waste Segregation with Image Recognition**  
  Users can upload images of waste items, and the system identifies the type of waste using OpenCV and custom algorithms.  

- **Community Engagement via Points System**  
  Users earn points for correctly categorizing waste and contributing to sustainable waste management.  

- **Smart Dustbin Pickup Route Optimization**  
  Municipalities or waste collection services can optimize pickup routes based on user reports of bin status, reducing inefficiencies and improving service.  

## **Technologies Used**  

### **Frontend**  
- React.js – Interactive user interface for waste tracking and community engagement.  
- Tailwind CSS – Modern and responsive UI styling.  

### **Backend**  
- Django – API development and data management.  
- Django REST Framework – API endpoints for waste classification and user interactions.  

### **Image Processing & Waste Classification**  
- OpenCV – Image recognition for waste categorization.  
- Custom Algorithms – Used for route optimization.  

### **Data Processing & Storage**  
- SQLite – Database for storing waste reports, user points, and bin status.  
- Custom Route Optimization Algorithm – Calculates the best waste collection routes.  

## **Getting Started**  

### **Prerequisites**  
Ensure you have the following installed:  

- Node.js and npm/yarn for the frontend  
- Python 3.8+ for the backend  
- Virtual environment (venv) for Python dependencies  

### **Installation**  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/waste-wise.git
   cd waste-wise
   ```

2. **Backend Setup**  
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```

3. **Frontend Setup**  
   ```bash
   cd ../frontend
   npm install  # or yarn install
   npm start  # or yarn start
   ```
