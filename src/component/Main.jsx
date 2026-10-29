import CardList from "./CardList";
import "./css/Main.css";

function Main() {

    const newsData =[
        {
            id:1,
            title:"Getting Started with Web Development",
            date:"October 27, 2026",
            image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
            alt:"Article cover",
            author:"By Ahmed Mohamed",
            content:"Learn the fundamentals of web development and build responsive websites using HTML, CSS, and JavaScript.",
        },
        {
            id:2,
            title:"Building a Responsive Website",
            date:"October 27, 2026",
            image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
            alt:"Article cover",
            author:"By Ahmed Mohamed",
            content:"Learn the fundamentals of web development and build responsive websites using HTML, CSS, and JavaScript.",
        },
        {
            id:3,
            title:"Building a Responsive Website",
            date:"October 27, 2026",
            image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
            alt:"Article cover",
            author:"By Ahmed Mohamed",
            content:"Learn the fundamentals of web development and build responsive websites using HTML, CSS, and JavaScript.",
        },
        {
            id:4,
            title:"Building a Responsive Website",
            date:"October 27, 2026",
            image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
            alt:"Article cover",
            author:"By Ahmed Mohamed",
            content:"Learn the fundamentals of web development and build responsive websites using HTML, CSS, and JavaScript.",
        },
        {
            id:5,
            title:"Building a Responsive Website",
            date:"October 27, 2026",
            image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
            alt:"Article cover",
            author:"By Ahmed Mohamed",
            content:"Learn the fundamentals of web development and build responsive websites using HTML, CSS, and JavaScript.",
        },
        {
            id:6,
            title:"Building a Responsive Website",
            date:"October 27, 2026",
            image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
            alt:"Article cover",
            author:"By Ahmed Mohamed",
            content:"Learn the fundamentals of web development and build responsive websites using HTML, CSS, and JavaScript.",
        },
        {
            id:7,
            title:"Building a Responsive Website",
            date:"October 27, 2026",
            image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
            alt:"Article cover",
            author:"By Ahmed Mohamed",
            content:"Learn the fundamentals of web development and build responsive websites using HTML, CSS, and JavaScript.",
        },
    ]
  return (
    <main className="main">
      <div className="main__container">
        <h1 className="main__title">Latest Articles</h1>

        <ul className="main__card-list">
            {newsData.map((newsitem) => (
                <CardList  key={newsitem.id} {...newsitem} />
            ))}
        </ul>
      </div>
    </main>
  );
}

export default Main;
