export const CLIENT_ID = "69016056321-5j2fr23vo8oggc3jsqksgu2a4g1s1mhn.apps.googleusercontent.com";
export const DEFAULT_AVATAR_URL = "https://i.postimg.cc/ZKJv2rf0/default-user-unknown-icon.png";
export const ACCESS_TOKEN_NOT_EXIST = "ACCESS_TOKEN_NOT_EXIST";
export const RANDOM_AVATAR_API = "https://i.pravatar.cc/300";
export const RANDOM_IMG_API = "https://random.imagecdn.app/100/100";

export const AWS_ACCESS_KEY_ID = "AKIA2UVUUNPTZMZMEB67";
export const AWS_SECRET_KEY = "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";

export const INVALID_EMAIL_DOMAIN = "INVALID_EMAIL_DOMAIN";
export const EMAIL_ALREADY_EXIST = "EMAIL_ALREADY_EXIST";
export const ACCOUNT_NOT_FOUND = "ACCOUNT_NOT_FOUND";
export const ACCOUNT_NOT_ENABLE = "ACCOUNT_NOT_ENABLED";

export const SIGNIN_ACCOUNT_NOT_FOUND_CODE = 401;
export const SIGNIN_ACCOUNT_NOT_FOUND_ERROR_MESSAGE = "Your email has not been signed up";

export const SIGNIN_INVALID_EMAIL_DOMAIN_CODE = 406;
export const SIGNIN_INVALID_EMAIL_DOMAIN_ERROR_MESSAGE = "Your email is not allowed sign in to the system.";

export const SIGNUP_EMAIL_ALREADY_EXIST_CODE = 406;
export const SIGNUP_EMAIL_ALREADY_EXIST_ERROR_MESSAGE = "This email has been signed up before. Please try again.";

export const SIGNUP_INVALID_EMAIL_DOMAIN_CODE = 406;
export const SIGNUP_INVALID_EMAIL_DOMAIN_ERROR_MESSAGE = "This email is not FPT email domain. Please try again.";

export const SIGNIN_ACCOUNT_NOT_ENABLE_CODE = 403;
export const SIGNIN_ACCOUNT_NOT_ENABLE_ERROR_MESSAGE = "Your account has not been activated. Please wait for our email response. Thank you.";

//Page title
export const AUTH_PAGE_SIGN_UP_TITLE = "Sign up to Lasa";
export const AUTH_PAGE_SIGN_IN_TITLE = "Sign in to Lasa";
export const HOME_PAGE_TITLE = "Home - Lecturer Appoinment Schedule";
export const SEARCH_PAGE_TITLE = "Search the right lecturer for you";
export const DASHBOARD_PAGE_TITLE = "Dashboard";

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
export const PRODUCT_BASE_URL = "http://34.87.119.36:8080/las/api/v1";

export const SIGN_IN_GOOGLE_API = "/authentication/google";
export const SIGN_IN_LOCAL_API = "/authentication";
export const CHECK_VALID_SIGN_UP_EMAIL = "/authentication/email";

export const SIGN_UP_STUDENT_GOOGLE_API = "/authentication/google/student";
export const SIGN_UP_LECTURER_GOOGLE_API = "/authentication/google/lecturer";

export const GET_USER_INFO_API = "/home/information";
export const CHECK_VALID_ACCESS_TOKEN = "/home/information";

export const GET_MAJOR_API = "/majors";
export const GET_MAJOR_WITH_TOPICS_API = "/majors/topics";
export const GET_TOPIC_API = "/topics";
export const GET_SLOT_API = "/slots";
export const BOOKING_REQUEST_API = "/booking-requests"
export const GET_SLOT_TOPIC_DETAIL_API = "/slot-topic-details";
export const GET_LECTURER_API = "/lecturers";
export const GET_STUDENT_API = "/students";