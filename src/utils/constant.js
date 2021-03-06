export const CLIENT_ID =
  "69016056321-5j2fr23vo8oggc3jsqksgu2a4g1s1mhn.apps.googleusercontent.com";
export const DEFAULT_AVATAR_URL =
  "https://i.postimg.cc/ZKJv2rf0/default-user-unknown-icon.png";
export const ACCESS_TOKEN_NOT_EXIST = "ACCESS_TOKEN_NOT_EXIST";
export const RANDOM_AVATAR_API = "https://i.pravatar.cc/300";
export const RANDOM_IMG_API = "https://random.imagecdn.app/100/100";
export const RANDOM_BACKGROUND_IMG_API =
  "https://source.unsplash.com/user/erondu/";

export const AWS_ACCESS_KEY_ID = "AKIA2UVUUNPTZMZMEB67";
export const AWS_SECRET_KEY = "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";

export const INVALID_EMAIL_DOMAIN = "INVALID_EMAIL_DOMAIN";
export const EMAIL_ALREADY_EXIST = "EMAIL_ALREADY_EXIST";
export const ACCOUNT_NOT_FOUND = "ACCOUNT_NOT_FOUND";
export const ACCOUNT_NOT_ENABLE = "ACCOUNT_NOT_ENABLED";

export const SIGNIN_ACCOUNT_NOT_FOUND_CODE = 401;
export const SIGNIN_ACCOUNT_NOT_FOUND_ERROR_MESSAGE =
  "Your email has not been signed up";

export const SIGNIN_INVALID_EMAIL_DOMAIN_CODE = 406;
export const SIGNIN_INVALID_EMAIL_DOMAIN_ERROR_MESSAGE =
  "Your email is not allowed sign in to the system.";

export const SIGNUP_EMAIL_ALREADY_EXIST_CODE = 406;
export const SIGNUP_EMAIL_ALREADY_EXIST_ERROR_MESSAGE =
  "This email has been signed up before. Please try again.";

export const SIGNUP_INVALID_EMAIL_DOMAIN_CODE = 406;
export const SIGNUP_INVALID_EMAIL_DOMAIN_ERROR_MESSAGE =
  "This email is not FPT email domain. Please try again.";

export const SIGNIN_ACCOUNT_NOT_ENABLE_CODE = 403;
export const SIGNIN_ACCOUNT_NOT_ENABLE_ERROR_MESSAGE =
  "Your account has not been activated. Please wait for our email response. Thank you.";

//Booking Status
export const BOOKING_STATUS_DELETED = -2;
export const BOOKING_REQUEST_STATUS_DENIED = -1;
export const BOOKING_REQUEST_STATUS_CANCELED = 0;
export const BOOKING_REQUEST_STATUS_WAITING = 1;
export const BOOKING_REQUEST_STATUS_READY = 2;
export const BOOKING_REQUEST_STATUS_NOTIFIED = 3;
export const BOOKING_REQUEST_STATUS_FINISHED = 4;

//Slot Status
export const SLOT_STATUS_DELETED = -1;
export const SLOT_STATUS_CANCELED = 0;
export const SLOT_STATUS_WAITING = 1;
export const SLOT_STATUS_READY = 2;
export const SLOT_STATUS_NOTIFIED = 3;
export const SLOT_STATUS_FINISHED = 4;

//User account status
export const USER_STATUS_INACTIVE = 0;
export const USER_STATUS_ACTIVE = 1;
export const USER_STATUS_BANNED = -1;

//Page title
export const AUTH_PAGE_SIGN_UP_TITLE = "Sign up to Lasa";
export const AUTH_PAGE_SIGN_IN_TITLE = "Sign in to Lasa";
export const HOME_PAGE_TITLE = "Home - Lecturer Appointment Schedule";
export const SEARCH_PAGE_TITLE = "Search the right lecturer for you";
export const DASHBOARD_PAGE_TITLE = "Dashboard";
export const PROFILE_PAGE_TITLE = "Your profile";

//View point
export const DAY_VIEW = 1;
export const WEEK_VIEW = 7;
export const MONTH_VIEW = 30;

//Roles
export const STUDENT_ROLE = "ROLE_STUDENT";
export const LECTURER_ROLE = "ROLE_LECTURER";
export const ADMIN_ROLE = "ROLE_ADMIN";

//API url
export const DEVELOP_BASE_URL = "http://localhost:8080/las/api/v1";
export const PRODUCT_BASE_URL = "https://lasfpt.online/api/v1";
export const BASE_URL = PRODUCT_BASE_URL;
// export const BASE_URL = DEVELOP_BASE_URL;

export const SIGN_IN_GOOGLE_API = "/authentication/google";
export const SIGN_IN_LOCAL_API = "/authentication";
export const CHECK_VALID_SIGN_UP_EMAIL = "/authentication/email";

export const SIGN_UP_STUDENT_GOOGLE_API = "/authentication/google/student";
export const SIGN_UP_LECTURER_GOOGLE_API = "/authentication/google/lecturer";

export const GET_USER_INFO_API = "/home/information";
export const CHECK_VALID_ACCESS_TOKEN = "/home/information";

export const ADMIN_API_URL = "/admins";
export const GET_MAJOR_API = "/majors";
export const GET_MAJOR_WITH_TOPICS_API = "/majors/topics";
export const GET_TOPIC_API = "/topics";
export const GET_SLOT_API = "/slots";
export const BOOKING_REQUEST_API = "/booking-requests";
export const GET_SLOT_TOPIC_DETAIL_API = "/slot-topic-details";
export const GET_LECTURER_API = "/lecturers";
export const GET_STUDENT_API = "/students";

//Slot api sort by
export const SORT_BY_TIME_START = "timeStart";
export const SORT_BY_TIME_END = "timeEnd";
export const SORT_BY_LECTURERID = "lecturerId";
export const SORT_BY_SLOTID = "id";

//Order by
export const ORDER_BY_ASC = "ASC";
export const ORDER_BY_DESC = "DESC";
