import { useQuery } from "@tanstack/react-query";
import Nav from "../Components/Nav";
import AddTodo from "../Components/AddTodo";
import ActiveTodos from "../Components/ActiveTodos";
import CompletedTodos from "../Components/CompletedTodos";
import Footer from "../Components/Footer";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function HomePage() {

    const { user, isLoaded } = useUser();

    const { data, isLoading } = useQuery({
        queryKey: [`todos`],
        queryFn: async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_TODOS_API}?userEmail=${user?.primaryEmailAddress?.emailAddress}`);
                const data = await res.json();
                return data;
            } catch (e) {
                console.log(e);
            }
        },
        refetchOnWindowFocus: false,
        enabled: Boolean(user)
    });

    return (
        <div className='home-page'>
            {/* Nav */}
            <Nav />
            {/* Main */}
            <main className="flex items-center py-10 min-h-[calc(100vh-144px)]">
                <div className="container">
                    <div className="todos-container lg:max-w-[1000px] mx-auto">
                        {/* Add Todo */}
                        <AddTodo
                            className="mb-10"
                            todos={data ? data.todos : []}
                        />
                        {
                            !isLoaded ? (
                                <p className="text-center opacity-50">Loading...</p>
                            )
                                :
                                !user ? (
                                    <p className="text-center opacity-50 *:opacity-100">
                                        Please <Link to={`/signin`} className="font-semibold underline">Signin</Link> to use.
                                    </p>
                                ) : isLoading ? (
                                    <p className="text-center opacity-50">Loading...</p>
                                ) : data?.todos.length > 0 ? (
                                    <>
                                        {/* Active Todos */}
                                        <ActiveTodos
                                            className="mb-5"
                                            todosIsLoading={isLoading}
                                            todos={data ? data.todos : []}
                                        />
                                        {/* Completed Todos */}
                                        <CompletedTodos
                                            todosIsLoading={isLoading}
                                            todos={data ? data.todos : []}
                                        />
                                    </>
                                ) : (
                                    <p className="text-center opacity-50 *:opacity-100">No todos added yet.</p>
                                )
                        }
                    </div>
                </div>
            </main>
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default HomePage;