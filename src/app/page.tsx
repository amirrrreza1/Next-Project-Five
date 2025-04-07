const HomePage = () => {
  const url = new URL("https://example.com/page?name=ali&age=25");

  console.log(url.href); // کل آدرس
  console.log(url.protocol); // https:
  console.log(url.hostname); // example.com
  console.log(url.pathname); // /page
  console.log(url.search); // ?name=ali&age=25
  console.log(url.searchParams.get("age")); // ali

  console.log(url.searchParams.get("name")); // ali
  console.log(url.searchParams.get("age")); // 25

  url.searchParams.set("age", "30");
  url.searchParams.append("gender", "male");
  url.searchParams.delete("name");

  console.log(url.toString());

  return (
    <>
      <div className="w-full max-w-[800px] m-auto flex justify-center items-center">
        <div className="text-center p-4">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to the Error Logging Project
          </h1>
          <p className="text-lg mb-6">
            This project is designed to monitor and log errors across both
            frontend and backend processes. The error logs are saved in
            Firebase, providing a comprehensive way to track and analyze
            application issues in real time. Below is an overview of the main
            features and functionality:
          </p>

          <div className="text-left text-xl">
            <h2 className="font-semibold">Project Overview:</h2>
            <ul className="list-disc pl-6">
              <li>
                All errors (both frontend and backend) are logged in Firebase.
              </li>
              <li>
                The error logs include essential details such as error message,
                stack trace, status codes, and timestamps.
              </li>
              <li>
                The Firebase database stores logs in a collection called
                "errors," making them easy to query and analyze.
              </li>
              <li>
                When a 404 error occurs or any invalid page is visited, the
                application logs this error in Firebase.
              </li>
              <li>
                The system tracks API call errors, including the HTTP status
                code and any failure reason.
              </li>
            </ul>

            <h2 className="font-semibold mt-4">How It Works:</h2>
            <ol className="list-decimal pl-6">
              <li>
                When an error occurs in the app (e.g., API failure, 404 not
                found), the <b>logErrorToFirebase</b> function is triggered to
                send error details to Firebase.
              </li>
              <li>
                The error details include the <b>error message</b>,{" "}
                <b>stack trace</b>, and <b>status code</b> (e.g., 404, 500).
              </li>
              <li>
                Each log entry is timestamped to ensure accurate tracking of
                when the error occurred.
              </li>
              <li>
                All logs are stored in the Firebase Firestore database under the
                "errors" collection, where each log entry is saved as a new
                document.
              </li>
              <li>
                Errors can be retrieved and viewed in real-time for debugging or
                monitoring purposes.
              </li>
            </ol>

            <h2 className="font-semibold mt-4">Technologies Used:</h2>
            <ul className="list-disc pl-6">
              <li>
                <b>Firebase</b>: Used for storing error logs and API call data
                in Firestore.
              </li>
              <li>
                <b>Next.js</b>: The framework used to build the app, including
                dynamic routing and server-side functionality.
              </li>
              <li>
                <b>React</b>: The library used for building user interfaces,
                handling state, and rendering components.
              </li>
              <li>
                <b>Tailwind CSS</b>: A utility-first CSS framework used for
                responsive and customizable UI styling.
              </li>
            </ul>

            <h2 className="font-semibold mt-4">Future Enhancements:</h2>
            <ul className="list-disc pl-6">
              <li>
                Integrate real-time error monitoring with a notification system
                (e.g., email or Slack alerts).
              </li>
              <li>
                Add a dashboard to visualize error trends, with filters based on
                status codes, error types, etc.
              </li>
              <li>
                Implement a retry mechanism for failed API calls to improve
                resilience and user experience.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
