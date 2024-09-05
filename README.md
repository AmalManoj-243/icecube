# 369AI Project Documentation

This project is a comprehensive Expo React Native application for mobile platforms that integrates various features such as CRM, inventory, and API handling. This documentation provides an overview of the project structure, key components, and API integrations.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Directory Overview](#directory-overview)
3. [Components](#components)
4. [API Integration](#api-integration)
5. [Assets](#assets)
6. [Scripts and Configurations](#scripts-and-configurations)
7. [Usage](#usage)
8. [Running the Application](#running-the-application)

---

## Project Structure

The following is the structure of the project that provides an organized overview of directories and files:

```
.
├── App.js
├── app.json
├── assets
│   ├── android
│   │   ├── icon_background.png
│   │   ├── icon_foreground.png
│   │   ├── icon_monochrome.png
│   │   └── icon.png
│   ├── animations
│   │   ├── category_loading.json
│   │   ├── loading.json
│   │   └── loading_up_down.json
│   ├── favicon.png
│   ├── fonts
│   │   └── Urbanist
│   │       ├── Urbanist-Black.ttf
│   │       ├── Urbanist-Bold.ttf
│   │       ├── Urbanist-ExtraBold.ttf
│   │       ├── Urbanist-ExtraLight.ttf
│   │       ├── Urbanist-Light.ttf
│   │       ├── Urbanist-Medium.ttf
│   │       ├── Urbanist-Regular.ttf
│   │       ├── Urbanist-SemiBold.ttf
│   │       └── Urbanist-Thin.ttf
│   ├── icon.png
│   ├── icons
│   │   ├── bottom_tabs
│   │   │   ├── cart.png
│   │   │   ├── category.png
│   │   │   ├── home.png
│   │   │   ├── order.png
│   │   │   └── profile.png
│   │   ├── common
│   │   │   ├── box.png
│   │   │   ├── call_history.png
│   │   │   ├── gmail_history.png
│   │   │   ├── map_icon.png
│   │   │   ├── user_bg.png
│   │   │   └── watsapp.png
│   │   └── modal
│   │       ├── camera.png
│   │       ├── cancel.png
│   │       ├── cancel_rectangle.png
│   │       ├── gallery_upload.png
│   │       └── image_upload.png
│   ├── images
│   │   ├── EmptyData
│   │   │   ├── empty_cart.png
│   │   │   ├── empty_data.png
│   │   │   ├── empty_inventory_box.png
│   │   │   ├── empty_items.png
│   │   │   ├── empty.png
│   │   │   ├── empty_visits.png
│   │   │   └── transaction_empty.png
│   │   ├── error
│   │   │   └── error.png
│   │   ├── header
│   │   │   ├── check_button.png
│   │   │   ├── logo_header_bg_white.png
│   │   │   ├── logo_header.png
│   │   │   ├── refresh_button.png
│   │   │   └── transparent_logo_header.png
│   │   ├── Home
│   │   │   ├── Banner
│   │   │   │   ├── banner_phone_1.jpg
│   │   │   │   ├── banner_phone_2.jpg
│   │   │   │   ├── banner_phone_3.jpg
│   │   │   │   ├── banner_phone_4.jpg
│   │   │   │   ├── banner_phone_5.jpg
│   │   │   │   └── banner_phone_6.jpg
│   │   │   ├── Header
│   │   │   │   ├── barcode_scanner.png
│   │   │   │   ├── header.png
│   │   │   │   ├── header_transparent_bg.png
│   │   │   │   ├── notification_2.png
│   │   │   │   ├── notification.png
│   │   │   │   └── search.png
│   │   │   ├── options
│   │   │   │   ├── attendance
│   │   │   │   │   ├── attendance_requests.png
│   │   │   │   │   ├── dashboard.png
│   │   │   │   │   ├── leave_request.png
│   │   │   │   │   └── punching.png
│   │   │   │   ├── attendance.png
│   │   │   │   ├── box_inspection.png
│   │   │   │   ├── crm
│   │   │   │   │   ├── enquiry_register.png
│   │   │   │   │   ├── lead.png
│   │   │   │   │   └── pipeline.png
│   │   │   │   ├── crm.png
│   │   │   │   ├── customer_visit.png
│   │   │   │   ├── inventory_management_1.png
│   │   │   │   ├── inventory_management.png
│   │   │   │   ├── market_study_1.png
│   │   │   │   ├── market_study.png
│   │   │   │   ├── pickup.png
│   │   │   │   ├── product_enquiry.png
│   │   │   │   ├── product_purchase_requisition.png
│   │   │   │   ├── scan_barcode.png
│   │   │   │   ├── search_product.png
│   │   │   │   ├── tasK_manager_1.png
│   │   │   │   ├── task_manager.png
│   │   │   │   ├── transaction_auditing.png
│   │   │   │   └── visits_plan.png
│   │   │   └── section
│   │   │       ├── customer.png
│   │   │       ├── inventory_management.png
│   │   │       ├── pickup.png
│   │   │       ├── service.png
│   │   │       ├── services.png
│   │   │       └── spare_parts.png
│   │   ├── logo
│   │   │   └── logo.png
│   │   ├── Profile
│   │   │   ├── profile_bg.png
│   │   │   └── user.png
│   │   ├── scanner
│   │   │   └── scanner.png
│   │   └── Splash
│   │       └── splash.png
│   └── splash.png
├── babel.config.js
├── eas.json
├── generateAppJson.js
├── jsconfig.json
├── package.json
├── project_structure.txt
├── README.md
├── src
│   ├── api
│   │   ├── config
│   │   │   ├── apiConfig.js
│   │   │   └── index.js
│   │   ├── details
│   │   │   ├── detailApi.js
│   │   │   └── index.js
│   │   ├── dropdowns
│   │   │   └── dropdownApi.js
│   │   ├── endpoints
│   │   │   ├── endpoints.js
│   │   │   └── index.js
│   │   ├── services
│   │   │   ├── generalApi.js
│   │   │   └── utils.js
│   │   ├── uploads
│   │   │   ├── index.js
│   │   │   └──  uploadApi.js
│   │   └── utils
│   │       └── handleApiError.js
│   ├── components
│   │   ├── Calendar
│   │   │   ├── CalendarScreen.js
│   │   │   ├── index.js
│   │   │   └── VerticalScrollableCalendar.js
│   │   ├── Categories
│   │   │   ├── CategoryList.js
│   │   │   └── index.js
│   │   ├── common
│   │   │   ├── BottomSheets
│   │   │   │   ├── DropdownSheet.js
│   │   │   │   ├── index.js
│   │   │   │   └── MultiSelectDropdownSheet.js
│   │   │   ├── Button
│   │   │   │   ├── Button.js
│   │   │   │   ├── FABButton.js
│   │   │   │   ├── index.js
│   │   │   │   ├── LoadingButton.js
│   │   │   │   └── PressableInput.js
│   │   │   ├── CheckBox
│   │   │   │   ├── CheckBox.js
│   │   │   │   └── index.js
│   │   │   ├── DatePicker
│   │   │   │   ├── DatePicker.js
│   │   │   │   └── index.js
│   │   │   ├── Detail
│   │   │   │   ├── DetailCheckBox.js
│   │   │   │   ├── DetailField.js
│   │   │   │   ├── index.js
│   │   │   │   └── ProductDetail.js
│   │   │   ├── empty
│   │   │   │   ├── EmptyItem.js
│   │   │   │   ├── EmptyState.js
│   │   │   │   ├── index.js
│   │   │   │   └── styles.js
│   │   │   └── TextInput
│   │   │       ├── index.js
│   │   │       └── TextInput.js
│   │   ├── containers
│   │   │   ├── ButtonContainer.js
│   │   │   ├── index.js
│   │   │   ├── RoundedContainer.js
│   │   │   ├── RoundedScrollContainer.js
│   │   │   ├── SafeAreaView.js
│   │   │   └── SearchContainer.js
│   │   ├── CRM
│   │   │   ├── FollowUpList.js
│   │   │   ├── index.js
│   │   │   ├── Meetingslist.js
│   │   │   └── VisitList.js
│   │   ├── Header
│   │   │   ├── BottomSheetHeader.js
│   │   │   ├── index.js
│   │   │   └── NavigationHeader.js
│   │   ├── Home
│   │   │   ├── CarouselPagination.js
│   │   │   ├── Header.js
│   │   │   ├── ImageContainer.js
│   │   │   ├── index.js
│   │   │   ├── ListHeader.js
│   │   │   └── NavigationBar.js
│   │   ├── Loader
│   │   │   ├── AnimatedLoader.js
│   │   │   ├── index.js
│   │   │   └── OverlayLoader.js
│   │   ├── MapViewScreen
│   │   │   ├── index.js
│   │   │   ├── MapViewComponent.js
│   │   │   └── MapViewScreen.js
│   │   ├── Modal
│   │   │   ├── ActionModal.js
│   │   │   ├── AddUpdateModal.js
│   │   │   ├── backupEmployeeListModal.txt
│   │   │   ├── ConfirmationModal.js
│   │   │   ├── CustomListModal.js
│   │   │   ├── EmployeeLIstModal.js
│   │   │   ├── index.js
│   │   │   ├── InputModal.js
│   │   │   ├── LogoutModal.js
│   │   │   ├── MeetingsScheduleModal.js
│   │   │   └── RulesModal.js
│   │   ├── Options
│   │   │   ├── index.js
│   │   │   └── ListItem.js
│   │   ├── Product
│   │   │   ├── index.js
│   │   │   └── ProductsList.js
│   │   ├── Scanner
│   │   │   ├── Barcode_backup.txt
│   │   │   ├── Barcode.js
│   │   │   ├── index.js
│   │   │   └── Scanner.js
│   │   ├── SignaturePad.js
│   │   ├── TabBar
│   │   │   ├── CustomTabBar.js
│   │   │   ├── index.js
│   │   │   └── TabBarIcon.js
│   │   ├── Text.js
│   │   └── Toast
│   │       ├── CustomToast.js
│   │       ├── index.js
│   │       └── ToastAndroid.js
│   ├── constants
│   │   ├── dropdownConst.js
│   │   ├── links.js
│   │   └── theme.js
│   ├── hooks
│   │   ├── index.js
│   │   ├── useDataFetching.js
│   │   ├── useDebouncedSearch.js
│   │   ├── useDropdownFetching.js
│   │   └── useLoader.js
│   ├── navigation
│   │   ├── AppNavigator.js
│   │   └── StackNavigator.js
│   ├── screens
│   │   ├── Auth
│   │   │   ├── index.js
│   │   │   ├── LoginScreen.js
│   │   │   └── PrivacyPolicy.js
│   │   ├── Cart
│   │   │   ├── CartScreen.js
│   │   │   └── index.js
│   │   ├── Categories
│   │   │   ├── CategoriesScreen.js
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── Dashboard
│   │   │   ├── DashboardScreen.js
│   │   │   └── index.js
│   │   ├── Home
│   │   │   ├── HomeScreen.js
│   │   │   ├── index.js
│   │   │   ├── Options
│   │   │   │   ├── Attendance
│   │   │   │   │   ├── AttendanceScreen.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── Punching
│   │   │   │   │       ├── index.js
│   │   │   │   │       ├── MarkAttendance.js
│   │   │   │   │       └── PunchingScreen.js
│   │   │   │   ├── Audit
│   │   │   │   │   ├── AuditForm.js
│   │   │   │   │   ├── AuditList.js
│   │   │   │   │   ├── AuditScreen.js
│   │   │   │   │   └── index.js
│   │   │   │   ├── BoxInspection
│   │   │   │   │   ├── BoxInspectionForm.js
│   │   │   │   │   ├── BoxInspectionList.js
│   │   │   │   │   ├── BoxInspectionScreen.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   └── NonInspectedBoxItems.js
│   │   │   │   ├── CRM
│   │   │   │   │   ├── CRMScreen.js
│   │   │   │   │   ├── EnquiryRegister
│   │   │   │   │   │   ├── EnquiryDetailTabs
│   │   │   │   │   │   │   ├── Details.js
│   │   │   │   │   │   │   ├── EnquiryDetailTabs.js
│   │   │   │   │   │   │   ├── FollowUp.js
│   │   │   │   │   │   │   └── index.js
│   │   │   │   │   │   ├── EnquiryRegisterForm.js
│   │   │   │   │   │   ├── EnquiryRegisterList.js
│   │   │   │   │   │   ├── EnquiryRegisterScreen.js
│   │   │   │   │   │   └── index.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── Leads
│   │   │   │   │   │   ├── EditLead.js
│   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   ├── LeadDetailTabs
│   │   │   │   │   │   │   ├── CallHistory.js
│   │   │   │   │   │   │   ├── Details.js
│   │   │   │   │   │   │   ├── EmailHistory.js
│   │   │   │   │   │   │   ├── FollowUp.js
│   │   │   │   │   │   │   ├── index.js
│   │   │   │   │   │   │   ├── LeadDetailTabs.js
│   │   │   │   │   │   │   └── WhatsAppHistory.js
│   │   │   │   │   │   ├── LeadForm.js
│   │   │   │   │   │   ├── LeadList.js
│   │   │   │   │   │   └── LeadScreen.js
│   │   │   │   │   └── Pipeline
│   │   │   │   │       ├── EditPipeline.js
│   │   │   │   │       ├── index.js
│   │   │   │   │       ├── PipelineDetailTabs
│   │   │   │   │       │   ├── CallHistory.js
│   │   │   │   │       │   ├── CustomerVisit.js
│   │   │   │   │       │   ├── Details.js
│   │   │   │   │       │   ├── EmailHistory.js
│   │   │   │   │       │   ├── FollowUp.js
│   │   │   │   │       │   ├── index.js
│   │   │   │   │       │   ├── Meetings.js
│   │   │   │   │       │   ├── PipelineDetailTabs.js
│   │   │   │   │       │   └── WhatsAppHistory.js
│   │   │   │   │       ├── PipelineForm.js
│   │   │   │   │       ├── PipelineList.js
│   │   │   │   │       └── PipelineScreen.js
│   │   │   │   ├── index.js
│   │   │   │   ├── Inventory
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── InventoryBoxList.js
│   │   │   │   │   ├── InventoryDetails.js
│   │   │   │   │   ├── InventoryForm.js
│   │   │   │   │   ├── InventoryList.js
│   │   │   │   │   ├── InventoryRequestItem.js
│   │   │   │   │   ├── InventoryScreen.js
│   │   │   │   │   └── styles.js
│   │   │   │   ├── MarketStudy
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── MarketStudyForm.js
│   │   │   │   │   ├── MarketStudyList.js
│   │   │   │   │   └── MarketStudyScreen.js
│   │   │   │   ├── OptionsScreen.js
│   │   │   │   ├── Pickup
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── PickupDetailTabs
│   │   │   │   │   │   ├── Details.js
│   │   │   │   │   │   ├── FollowUp.js
│   │   │   │   │   │   └── PickupDetailsTabs.js
│   │   │   │   │   ├── PickupList.js
│   │   │   │   │   └── PickupScreen.js
│   │   │   │   ├── TaskManager
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── TaskManagerDetails.js
│   │   │   │   │   ├── TaskManagerForm.js
│   │   │   │   │   ├── TaskManagerList.js
│   │   │   │   │   └── TaskManagerScreen.js
│   │   │   │   ├── Visits
│   │   │   │   │   ├── EditVisit.js
│   │   │   │   │   ├── index.js
│   │   │   │   │   ├── VisitDetails.js
│   │   │   │   │   ├── VisitForm.js
│   │   │   │   │   └── VisitScreen.js
│   │   │   │   └── VisitsPlan
│   │   │   │       ├── EditVisitPlan.js
│   │   │   │       ├── index.js
│   │   │   │       ├── VisitPlanDetails.js
│   │   │   │       ├── VisitPlanDetailTabs
│   │   │   │       │   ├── CustomerVisit.js
│   │   │   │       │   ├── Details.js
│   │   │   │       │   ├── index.js
│   │   │   │       │   └── VisitPlanDetailTabs.js
│   │   │   │       ├── VisitPlanForm.js
│   │   │   │       ├── VisitPlanList.js
│   │   │   │       └── VisitsPlanScreen.js
│   │   │   └── Sections
│   │   │       ├── Customer
│   │   │       │   ├── CustomerDetails.js
│   │   │       │   ├── CustomerFormTabs
│   │   │       │   │   ├── Address.js
│   │   │       │   │   ├── ContactPerson.js
│   │   │       │   │   ├── CustomerFormTabs.js
│   │   │       │   │   ├── Details.js
│   │   │       │   │   ├── index.js
│   │   │       │   │   └── OtherDetails.js
│   │   │       │   ├── CustomerList.js
│   │   │       │   ├── CustomerScreen.js
│   │   │       │   ├── index.js
│   │   │       │   └── styles.js
│   │   │       ├── Pickup
│   │   │       │   └── index.js
│   │   │       └── Services
│   │   │           ├── index.js
│   │   │           ├── QuickService
│   │   │           │   ├── AddSpareParts.js
│   │   │           │   ├── index.js
│   │   │           │   ├── QuickServiceFormTabs
│   │   │           │   │   ├── Accessories.js
│   │   │           │   │   ├── Assignee.js
│   │   │           │   │   ├── Complaints.js
│   │   │           │   │   ├── CustomerDetails.js
│   │   │           │   │   ├── index.js
│   │   │           │   │   ├── Product.js
│   │   │           │   │   └── QuickServiceFormTabs.js
│   │   │           │   ├── QuickServiceList.js
│   │   │           │   ├── QuickServiceScreen.js
│   │   │           │   ├── ServiceDetails.js
│   │   │           │   ├── SparePartsList.js
│   │   │           │   ├── UpdateDetail.js
│   │   │           │   └── UpdateDetails.backup.txt
│   │   │           ├── ServiceScreen.js
│   │   │           └── SparePartsRequest
│   │   │               ├── index.js
│   │   │               ├── SparePartsRequestDetails.js
│   │   │               ├── SparePartsRequestList.js
│   │   │               └── SparePartsRequestScreen.js
│   │   ├── index.js
│   │   ├── KPIDashboard
│   │   │   ├── index.js
│   │   │   ├── KPIDashboardScreen.js
│   │   │   ├── KPIListingScreen.js
│   │   │   └── KpiList.js
│   │   ├── MyOrders
│   │   │   ├── index.js
│   │   │   └── MyOrdersScreen.js
│   │   ├── Products
│   │   │   ├── index.js
│   │   │   ├── ProductsScreen.js
│   │   │   └── styles.js
│   │   ├── Profile
│   │   │   ├── index.js
│   │   │   └── ProfileScreen.js
│   │   └── Splash
│   │       ├── index.js
│   │       └── SplashScreen.js
│   ├── stores
│   │   ├── auth
│   │   │   ├── index.js
│   │   │   └── useAuthStore.js
│   │   ├── box
│   │   │   ├── index.js
│   │   │   └── useInspectionStore.js
│   │   ├── currency
│   │   │   ├── index.js
│   │   │   └── useCurrencyStore.js
│   │   └── product
│   │       ├── index.js
│   │       └── productStore.js
│   └── utils
│       ├── common
│       │   ├── date
│       │   │   ├── formatDate.js
│       │   │   ├── formatDateTime.js
│       │   │   └── index.js
│       │   ├── index.js
│       │   ├── StringUtils.js
│       │   └── toastUtils.js
│       ├── config
│       │   ├── getConfig.js
│       │   └── index.js
│       ├── formatters
│       │   ├── formatData.js
│       │   └── index.js
│       └── validation
│           ├── index.js
│           ├── validationFunction.js
│           ├── validation.js
│           └── validationRules.js
├── tailwind.config.js
└── yarn.lock

110 directories, 378 files

```

### 1. **App.js**:
   The entry point of the React Native app.

### 2. **app.json**:
   Configuration file for the Expo application.

### 3. **assets**:
   This directory contains the application's static assets like icons, images, fonts, and animations.
   - **android/**: Icons for Android devices.
   - **animations/**: Lottie JSON files for app animations.
   - **fonts/**: Urbanist font family used for text rendering.
   - **icons/**: Various categories for bottom tabs, modals, etc.
   - **images/**: General app imagery like empty states, headers, banners, logos, etc.

### 4. **src**:
   This is the main source directory that contains all the logic and components.
   
   - **api/**:
     Handles API configuration and requests.
     - `config/`: API configuration files.
     - `details/`: API related to fetching detailed information.
     - `dropdowns/`: API for dropdown-related data.
     - `endpoints/`: Centralized endpoints.
     - `services/`: General API services used across the app.
     - `uploads/`: API for handling file uploads.
     - `utils/`: Utility functions like error handling.

   - **components/**:
     This folder contains all the reusable components for the application.
     - **Calendar/**: Calendar-related components like `CalendarScreen` and `VerticalScrollableCalendar`.
     - **Categories/**: Components related to categories, like `CategoryList`.
     - **Common/**: Contains common reusable components for the application.
        - **`BottomSheets/`**: Dropdown Components Single selection `DropdwonSheet` & Multiple selection `MultiSelectDropdownSheet` and styles for various bottom sheets used for displaying like additional information or options.
        - **`Button/`**: Components related to button likes `FABButton` , `LoadingButton` ,  `PressableInput` including different styles and also loading variations used across the application.
        - **`CheckBox/`**: Components for checkbox elements, including custom checkboxes and related functionality.
        - **`Detail/`**: Components for displaying detailed information, such as `DetailField` , `DetailCheckBox`, `ProductDetail` .
        - **`TextInput/`**: Components for text input fields, including variations like password fields and search inputs.
        - **`empty/`**: Components for empty listing & fill the empty space.

 - **CRM/**: Components handling CRM functionalities like `FollowUpList`, `Meetingslist`, and `VisitList`.
 - **Header/**: Components for headers including `NavigationHeader` and `BottomSheetHeader`.
- **Loader/**: Loading animations and overlays like `AnimatedLoader` and `OverlayLoader`.
- **Modal/**: Various modals like `ActionModal`,  `AddUpdateModal`, `ConfirmationModal`, `CustomListModal`, `LogoutModal` and more.
- **Options/**: Components for handling different options or list items.
- **Product/**: Components for displaying product-related data.
- **Scanner/**: Barcode and other scanner-related components.
- **containers/**: Containers for managing layouts like `RoundedScrollContainer`, `SafeAreaView`, and more.

---

## Directory Overview

### **assets/**
Includes images, icons, fonts, and animations used throughout the app.

### **src/api**
Here, we define all the API-related files that handle network requests. This includes configurations for handling responses, API endpoints, and services.

### **src/components/**
This is where all the building blocks of the UI live. It contains several subfolders that house reusable components.


---

## Components

Each component in this project is reusable and designed for flexibility this can be easily integrated into any React Native project. Below is a detailed breakdown of each component, including prop descriptions and default values. 

1. [CalendarScreen](#1-calendarscreen)
2. [VerticalScrollableCalendar](#2-verticalscrollablecalendar)
3. [DropdownSheet](#3-dropdownsheet)
4. [MultiSelectDropdownSheet](#4-multiselectdropdownsheet)
5. [Button](#5-button)
6. [FABButton](#6-fabbutton)
7. [LoadingButton](#7-loadingbutton)
8. [PressableInput](#8-pressableinput)
9. [CheckBox](#9-checkbox)
10. [SafeAreaView](#10-safeareaview)
11. [SearchContainer](#11-searchcontainer)
12. [RoundedContainer](#12-roundedcontainer)
13. [RoundedScrollContainer](#13-roundedscrollcontainer)
14. [BottomSheetHeader](#14-bottomsheetheader)
15. [NavigationHeader](#15-navigationheader)
16. [AnimatedLoader](#16-animatedloader)
17. [OverlayLoader](#17-overlayloader)
18. [CustomTabBar](#18-customtabbar)
19. [DetailField](#19-detailfield)
20. [TextInput](#20-textinput)


## 1. CalendarScreen

A scrollable calendar interface.

### Usage
Import the CalendarScreen component in your React Native file:
```jsx
import { CalendarScreen } from '@components/Calendar';
```
Use the CalendarScreen component in your JSX code:
```jsx
<CalendarScreen 
  markedDates={{ '2024-09-05': { marked: true } }} 
  onDayPress={(day) => console.log(day)}
  theme={{ selectedDayBackgroundColor: 'blue' }} 
/>
```

### Props

| Prop           | Type     | Description                                      | Default Value |
| -------------- | -------- | ------------------------------------------------ | ------------- |
| `markedDates`  | Object   | Object containing marked dates                   | `{}`          |
| `onDayPress`   | Function | Function called when a date is pressed            | `() => {}`    |
| `theme`        | Object   | Custom theme for calendar appearance             | `{}`          |
| `style`        | Object   | Additional styles for the calendar component      | `{}`          |

---

## 2. VerticalScrollableCalendar

A vertical scrollable calendar interface.

### Usage

Import the VerticalScrollableCalendar component in your React Native file:

```jsx
import { VerticalScrollableCalendar } from '@components/Calendar';
```
Use the VerticalScrollableCalendar component in your JSX code:
```jsx
<VerticalScrollableCalendar 
  date={new Date()} 
  onChange={(day) => console.log(day)} 
/>
```

### Props

| Prop         | Type     | Description                                    | Default Value |
| ------------ | -------- | ---------------------------------------------- | ------------- |
| `date`       | Date     | The current selected date                      | `new Date()`  |
| `onChange`   | Function | Function called when the user selects a new day | `() => {}`    |

---

## 3. DropdownSheet

A bottom sheet dropdown for selecting options.

### Usage
```jsx
import DropdownSheet from '@components/DropdownSheet';

<DropdownSheet 
  isVisible={true} 
  items={[{ label: 'Option 1' }, { label: 'Option 2' }]} 
  onValueChange={(item) => console.log(item)} 
  title="Select Option" 
  onClose={() => console.log('Sheet closed')} 
/>
```

### Props

| Prop            | Type      | Description                                             | Default Value   |
| --------------- | --------- | ------------------------------------------------------- | --------------- |
| `isVisible`     | Boolean   | Controls the visibility of the bottom sheet             | `false`         |
| `items`         | Array     | Array of items to display in the dropdown               | `[]`            |
| `onValueChange` | Function  | Function called when an item is selected                | `() => {}`      |
| `title`         | String    | Title to display at the top of the dropdown             | `''`            |
| `onClose`       | Function  | Function called when the sheet is closed                | `() => {}`      |

---

## 4. MultiSelectDropdownSheet

A bottom sheet dropdown for selecting multiple options.

### Usage
```jsx
import MultiSelectDropdownSheet from '@components/MultiSelectDropdownSheet';

<MultiSelectDropdownSheet 
  isVisible={true} 
  items={[{ label: 'Option 1' }, { label: 'Option 2' }]} 
  onValueChange={(selectedItems) => console.log(selectedItems)} 
  title="Select Multiple" 
  previousSelections={['Option 1']} 
  onClose={() => console.log('Sheet closed')} 
/>
```

### Props

| Prop                | Type      | Description                                                   | Default Value   |
| ------------------- | --------- | ------------------------------------------------------------- | --------------- |
| `isVisible`         | Boolean   | Controls the visibility of the bottom sheet                   | `false`         |
| `items`             | Array     | Array of items to display in the dropdown                     | `[]`            |
| `onValueChange`     | Function  | Function called when items are selected                       | `() => {}`      |
| `title`             | String    | Title to display at the top of the dropdown                   | `''`            |
| `previousSelections`| Array     | List of items selected previously                             | `[]`            |
| `onClose`           | Function  | Function called when the sheet is closed                      | `() => {}`      |

---

## 5. Button

A reusable button component.

### Usage
```jsx
import Button from '@components/common/Button';

<Button 
  title="Click me" 
  onPress={() => console.log('Button clicked')} 
  disabled={false} 
/>
```

### Props

| Prop       | Type      | Description                       | Default Value |
| ---------- | --------- | --------------------------------- | ------------- |
| `title`    | String    | Button text                       | `''`          |
| `onPress`  | Function  | Function to call on button press   | `() => {}`    |
| `disabled` | Boolean   | Whether the button is disabled     | `false`       |

---

## 6. FABButton

A floating action button component.

### Usage
```jsx
import FABButton from '@components/common/FABButton';

<FABButton 
  onPress={() => console.log('FAB clicked')} 
  icon="plus" 
/>
```

### Props

| Prop       | Type      | Description                        | Default Value |
| ---------- | --------- | ---------------------------------- | ------------- |
| `onPress`  | Function  | Function to call on button press    | `() => {}`    |
| `icon`     | String    | Icon to display inside the FAB      | `''`          |

---

## 7. LoadingButton

A button that shows a loading indicator when pressed.

### Usage
```jsx
import LoadingButton from '@components/common/LoadingButton';

<LoadingButton 
  title="Submit" 
  loading={true} 
  onPress={() => console.log('Loading button clicked')} 
/>
```

### Props

| Prop       | Type      | Description                         | Default Value |
| ---------- | --------- | ----------------------------------- | ------------- |
| `title`    | String    | Button text                         | `''`          |
| `loading`  | Boolean   | Whether to show the loading spinner | `false`       |
| `onPress`  | Function  | Function to call on button press     | `() => {}`    |

---

## Other Components

Please refer to the respective code files for usage examples and prop details for the following components:

- `PressableInput`
- `CheckBox`
- `SafeAreaView`
- `SearchContainer`
- `RoundedContainer`
- `RoundedScrollContainer`
- `BottomSheetHeader`
- `NavigationHeader`
- `AnimatedLoader`
- `OverlayLoader`
- `CustomTabBar`
- `DetailField`
- `TextInput`

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/yourproject.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the app:
```bash
npm start
```

---

## License

This project is licensed under the MIT License.

---

This `README.md` provides clear, professional, and reusable component documentation along with prop descriptions and default values. Each component has a dedicated section explaining its usage and customization options. You can further expand the details for each component as needed.

---

## API Integration

The project integrates APIs via the `src/api` folder, where different services are modularized to handle various operations:
- **detailApi.js**: Manages fetching detailed data from the server.
- **dropdownApi.js**: Fetches dropdown options dynamically.
- **generalApi.js**: Contains general service APIs for interacting with external data.

---

## Assets

The assets folder contains all static resources:
- **Animations**: JSON files for animated elements.
- **Fonts**: Font files, mainly the Urbanist font family.
- **Icons**: Various icons for bottom tabs, modals, and common elements.
- **Images**: Images categorized into sections like `EmptyData`, `Home`, `Profile`, etc.

---

## Scripts and Configurations

### 1. **babel.config.js**:
   Babel configuration file for compiling the app.

### 2. **package.json**:
   Contains all the dependencies and scripts needed to run the app.

### 3. **eas.json**:
   Configuration for Expo Application Services (EAS).

---

## Usage

### Importing Components
Each component can be imported from the `src/components` folder and reused across the application:

```js
import CalendarScreen from './components/Calendar/CalendarScreen';
import DropdownSheet from './components/common/BottomSheets/DropdownSheet';
```

### API Integration Example
To make an API call from a component, import the necessary function from `src/api`:

```js
import { getDetailData } from '../api/details/detailApi';
```

---

## Running the Application

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/369ai.git
   cd 369ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo server:
   ```bash
   npx expo start
   ```

---

This is an overview of the structure and workflow for your React Native project. For more detailed explanations of specific components, check their individual documentation or component files.

---

This README will provide clarity on your project's architecture and serve as a professional guide for onboarding new developers. Let me know if you'd like to expand on any specific sections or add more detailed descriptions for components!
]([url]([url]([url]([url](url)))))
