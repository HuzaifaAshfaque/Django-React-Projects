import Card from "../Components/card";

function Home() {

  return (
    <>  
        <h2 className="mb-4" >My all Projects </h2>
        <div style={{ display: "flex", gap: "20px" }}>
            <Card
                title="Hello World Page"
                description="Click to visit HelloWorld page"
                navigateTo="/hello-world"
            />
            <Card
                title="Crud Page"
                description="Click to visit Crud Page"
                navigateTo="/crud"
            />
        </div>
    </>
  );
}

export default Home;
