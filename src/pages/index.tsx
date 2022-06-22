import { trpc } from "../utils/trpc";
import { PrismaClient } from "@prisma/client";
import { FormEvent, FormEventHandler } from "react";

const prisma = new PrismaClient();
export async function getServerSideProps() {
  const contacts = await prisma.contact.findMany();
  return {
    props: {
      contacts: JSON.parse(JSON.stringify(contacts)),
    },
  };
}

export default function IndexPage() {
  const hello = trpc.useQuery(["hello", { text: "client" }]);
  const addContact = trpc.useMutation(["add-contact"]);

  const handleAdd = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    // const contacts = await fetch("/api/contact", { name, email });

    const contact = await addContact.mutate({ name, email });
    console.log(contact);
  };

  return (
    <div>
      <p>{hello.data?.greeting}</p>

      <form onSubmit={(event) => handleAdd(event)}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" id="email" />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
}
