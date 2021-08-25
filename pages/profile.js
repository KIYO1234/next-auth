// getSession は "next-auth/client" から import してくるけど、サーバーサイドでも使える！
import { getSession } from "next-auth/client";
import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return <UserProfile />;
}

// getStaticProps() はビルド時に実行されるため、ユーザーの認証を判定する前に実行されてしまう => リクエストごとに実行させたいから getServerSideProps()
export const getServerSideProps = async (context) => {
  // When calling getSession() server side, you need to pass {req} or context object.（cookieを探すため）
  const session = await getSession({ req: context.req });
  // console.log('👩 session: ', session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default ProfilePage;
