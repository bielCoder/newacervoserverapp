
    <table>
    <thead>
       <tr>
            <th>ID</th>
            <th>Código do Produto</th>
            <th>Marca</th>
            <th>Cor</th>
            <th>Tamanho</th>
            <th>Sexo</th>
            <th>Retirada</th>
            <th>Devolução</th>
       </tr>
    </thead>
    <tbody>
        @foreach($historics as $historics) 
        <tr>
            <td>{{ historic -> id }}</td>
            <td>{{ historic -> code }}</td>
            <td>{{ historic -> brand }}</td>
            <td>{{ historic -> color }}</td>
            <td>{{ historic -> size }}</td>
            <td>{{ historic -> sexo }}</td>
            <td>{{ historic -> withdraw }}</td>
            <td>{{ historic -> devolution }}</td>
        </tr>
        @endforeach
    </tbody>
</table>


