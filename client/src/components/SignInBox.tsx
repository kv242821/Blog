import { Link } from "react-router-dom";
import { emailIcon, googleIcon } from "../assets/icons";

type SignInBoxType = {
  message?: string;
  typeOfLogin: string;
};

const SIGNIN_OPTIONS = [
  {
    id: 1,
    title: "with Google",
    handler: "Google",
    image: googleIcon,
  },
];

export default function SignInBox({ message, typeOfLogin }: SignInBoxType) {
  function handleGoogleAuth() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL,
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
    const qs = new URLSearchParams(options);
    window.location.assign(`${rootUrl}?${qs.toString()}`);
  }

  return (
    <div
      style={{
        width: "650px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        padding: "8vh 4vw",
        boxShadow:
          "rgb(190, 190, 190) 2px 2px 12px, rgb(255, 255, 255) -20px -20px 60px",
      }}
    >
      <p
        style={{
          fontFamily: "Inter",
          fontSize: "28px",
          marginBottom: "30px",
          wordBreak: "break-word",
          textAlign: "center",
        }}
      >
        {message}
      </p>
      {SIGNIN_OPTIONS.map((item) => {
        return (
          <ButtonLoginWith
            image={item.image}
            key={item.id}
            onClick={handleGoogleAuth}
            text={typeOfLogin + " " + item.title}
          />
        );
      })}

      <p
        style={{
          fontSize: "13px",
          color: "gray",
          width: "78%",
          textAlign: "center",
          lineHeight: "22px",
          marginTop: "22px",
        }}
      >
        Click “{typeOfLogin}” to agree to The Blog’s Terms of Service and
        acknowledge that The Blog’s Privacy Policy applies to you.
      </p>
    </div>
  );
}

function ButtonLoginWith({
  image,
  onClick,
  text,
}: {
  onClick(): void;
  text: string;
  image: any;
}) {
  return (
    <button
      style={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "6px 14px",
        borderRadius: "18px",
        width: "200px",
        border: "1px solid #c9c9c9",
        gap: "12px",
        cursor: "pointer",
        color: "#5c5c5c",
      }}
      onClick={() => {
        onClick();
      }}
    >
      {image}
      {text}
    </button>
  );
}
