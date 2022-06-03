<h1>Warehouse management site</h1>
<p>The idea of the system is to enable warehouse management in an updated 
and remote manner with the compartmentalization of system users according to 
their roles.</p>
<p>In addition, exposing an endpoint for querying products from the warehouse without the need to connect to the system</p>
<p>
All employees and clients are divided into three roles:
</p>
<ul><li>Manger</li><li>Worker</li><li>Client</li></ul>
<p>In addition, any customer can register on the site and query about a 
particular product.</p>
<p>Before all queries are made a verification is made that the user is indeed 
logged in, the verification is made against a token signed by the server.
</p>

<p>The "Client role" let you search for particular product.</p>
<p>The "Worker role" gives the same capabilities that the Client role 
has in addition, the Worker role gives the ability to insert a sale into the 
system.
</p>
<p>The "Manger role" gives you all the capabilities available in the system:</p>
<ol><li>Search for products.</li><li>Insert a 
sale.</li><li>Adding/Modifying/Deleting an 
existing product.</li><li>Get information on the best/worst selling products.
</li><li>Change role for system user.
</li></ol>


