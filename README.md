# SANURA FLAVOURS - Food Ordering System
## Customer Registration & Dashboard Frontend

### 📋 Project Overview

This is a complete frontend solution for a food ordering system called **SANURA FLAVOURS**. The system includes:

1. **User Registration Page** - With comprehensive form validation
2. **Dashboard** - Post-registration user interface
3. **Responsive Design** - Works on all devices (mobile, tablet, desktop)
4. **Data Persistence** - Uses localStorage for user data management

---

## 📁 File Structure

```
Assignment project/
├── registration.html      # Registration form page
├── registration.css       # Registration page styles
├── registration.js        # Registration form validation & logic
├── dashboard.html         # User dashboard after registration
├── dashboard.css          # Dashboard styles
├── dashboard.js           # Dashboard functionality
└── README.md             # This file
```

---

## ✨ Features

### Registration Page Features:
- ✅ **Real-time Form Validation**
  - Full Name (3+ characters, letters only)
  - Email (valid email format)
  - Phone Number (10+ digits)
  - Street Address (5+ characters)
  - City (2+ characters)
  - Postal Code
  - Password (8+ chars, uppercase, lowercase, numbers)
  - Confirm Password (must match)
  - Terms & Conditions agreement

- ✅ **Visual Feedback**
  - Green checkmark for valid fields
  - Red border/background for invalid fields
  - Real-time error messages
  - Password strength indicator (weak/medium/strong)

- ✅ **Loading State**
  - Loading spinner during account creation
  - Disabled submit button during processing

- ✅ **Success Flow**
  - Custom success message with user's name
  - Button to proceed to dashboard
  - Data stored in localStorage

### Dashboard Features:
- ✅ **User Profile Display**
  - All registered information displayed
  - Registration date tracking
  - Edit profile button (placeholder)

- ✅ **Quick Actions**
  - Browse Menu
  - Recent Orders
  - Favorites
  - Special Offers

- ✅ **Activity Statistics**
  - Total Orders count
  - Total Spent tracking
  - Loyalty Points

- ✅ **Responsive Navigation**
  - Sticky header with branding
  - Mobile hamburger menu
  - Navigation links

- ✅ **Company Information**
  - SANURA FLAVOURS branding throughout
  - About section with features
  - Contact information in footer

---

## 🎨 Design Features

### Color Scheme:
- **Primary Color**: #ff6b3d (Orange)
- **Primary Dark**: #e55a2b
- **Background**: #f5f7fb (Light Gray)
- **Text Primary**: #111827 (Dark)
- **Text Secondary**: #6b7280 (Gray)
- **Success**: #16a34a (Green)
- **Error**: #dc2626 (Red)

### Typography:
- System fonts for modern look
- Responsive font sizes
- Clear visual hierarchy

### Effects:
- Smooth transitions (0.3s)
- Hover effects on buttons and cards
- Animations for messages
- Shadow effects for depth

---

## 🔧 How to Use

### 1. **Open Registration Page**
```
Open registration.html in your web browser
```

### 2. **Fill Registration Form**
- Enter all required information
- Fields will validate in real-time
- Password strength indicator shows password quality
- Accept terms & conditions

### 3. **Submit Form**
- Click "Create Account" button
- Wait for confirmation (1.5 second processing)
- Success message will appear

### 4. **Access Dashboard**
- Click "Go to Dashboard" button
- Dashboard loads with your information
- All profile data is displayed

### 5. **Dashboard Navigation**
- Use navigation menu to explore features
- Click "Logout" to return to registration
- Mobile users can use hamburger menu

---

## 💾 Data Storage

### LocalStorage Keys:
1. **`users`** - Array of all registered users
   ```javascript
   [
     {
       id: "timestamp",
       fullName: "John Doe",
       email: "john@example.com",
       phone: "1234567890",
       address: "123 Main St",
       city: "New York",
       postalCode: "10001",
       password: "base64_encoded_password",
       registeredAt: "ISO_DATE"
     }
   ]
   ```

2. **`currentUser`** - Currently logged-in user
   ```javascript
   {
     id: "timestamp",
     fullName: "John Doe",
     email: "john@example.com",
     phone: "1234567890",
     address: "123 Main St",
     city: "New York",
     postalCode: "10001"
   }
   ```

---

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px - 1199px (adjusted layout)
- **Mobile**: Below 768px (stacked layout, hamburger menu)
- **Small Mobile**: Below 480px (minimized layout)

---

## 🔐 Security Notes

⚠️ **Important**: This is a frontend-only implementation:
- Passwords are base64 encoded (NOT secure)
- All data stored in browser localStorage
- For production, implement:
  - Backend API with proper authentication
  - Password hashing (bcrypt, PBKDF2, etc.)
  - Server-side validation
  - HTTPS encryption
  - Secure session management

---

## ✅ Validation Rules

### Full Name
- Minimum 3 characters
- Only letters, spaces, hyphens, apostrophes
- Required field

### Email
- Valid email format (user@domain.com)
- Required field

### Phone Number
- Minimum 10 digits
- Supports: digits, dashes, spaces, parentheses, plus sign
- Required field

### Address
- Minimum 5 characters
- Required field

### City
- Minimum 2 characters
- Only letters, spaces, hyphens, apostrophes
- Required field

### Postal Code
- Alphanumeric with dashes allowed
- Required field

### Password
- Minimum 8 characters
- Must contain uppercase letter
- Must contain lowercase letter
- Must contain number
- Optional: special characters for extra strength
- Required field

### Confirm Password
- Must match password field exactly
- Required field

### Terms & Conditions
- Must be checked
- Required field

---

## 🎯 Password Strength Levels

- **Weak**: 33% - Basic requirements met
- **Medium**: 66% - Good combination of characters
- **Strong**: 100% - Excellent password security

---

## 📝 Example Test Credentials

To test the system, you can use:

**Valid Registration:**
```
Full Name: John Smith
Email: john.smith@example.com
Phone: (555) 123-4567
Address: 123 Main Street
City: New York
Postal Code: 10001
Password: SecurePass123
Confirm Password: SecurePass123
Terms: ✓
```

---

## 🐛 Troubleshooting

### Form won't submit?
- Check all fields are filled correctly
- Ensure password meets requirements
- Confirm password must match
- Terms must be checked

### Dashboard not loading?
- Make sure you registered and clicked "Go to Dashboard"
- Check browser console for errors
- Clear localStorage and try again

### Lost data?
- Data is stored in browser localStorage
- Clearing browser data will remove all registrations
- Each browser/device has separate storage

---

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] Secure authentication system
- [ ] Email verification
- [ ] Password recovery
- [ ] Menu browsing functionality
- [ ] Shopping cart system
- [ ] Order history and tracking
- [ ] Payment integration
- [ ] Customer ratings and reviews
- [ ] Loyalty points system
- [ ] Admin dashboard

---

## 📞 Support

**For Support:**
- Email: support@sanura-flavours.com
- Phone: 1-800-SANURA
- Hours: 24/7 Customer Service

---

## ⚖️ License & Ownership

**SANURA FLAVOURS** - All Rights Reserved © 2026

This food ordering system frontend is proprietary software developed for SANURA FLAVOURS.

---

## 👨‍💻 Developer Notes

- All files use vanilla JavaScript (no frameworks)
- CSS is modular and maintainable
- Responsive design implemented with CSS Grid and Flexbox
- localStorage API used for client-side data persistence
- Code includes comprehensive comments for maintenance

---

**Last Updated**: February 10, 2026

**Version**: 1.0.0
