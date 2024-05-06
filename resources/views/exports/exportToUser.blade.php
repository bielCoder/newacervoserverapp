
    <table>
    <thead>
    <thead>
            <tr>
                <th>Entregue por</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Quem está retirando</th>
            </tr>
            <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th></th>
                <th></th>
                <th></th>
                <th>Nome</th>
                <th>Matrícula</th>
                <th>Função</th>
                <th>Departamento</th>
                <th>Email</th>
                <th>Produto</th>
                <th>Código</th>
                <th>Marca</th>
                <th>Cor</th>
                <th>Tamanho</th>
                <th>Gênero</th>
                <th>Observação</th>
                <th>Produto possui avaria?</th>
                <th>Descrição da Avaria</th>
                <th>Produto está Pendente</th>
                <th>Data de Retirada</th>
                <th>Data de Devolução</th>
                <th>Dias em Uso</th>
            </tr>
        </thead>
       <tr>
      
      
       </tr>
    </thead>
    <tbody>
        @foreach($historics as $historic) 
        <tr>
            <td>{{ $historic -> active_register }}</td>
            <td>{{ $historic -> active_name }}</td>
            <td></td>
            <td></td>
            <td></td>
           <td>{{ $historic -> name }}</td>
           <td>{{ $historic -> register }}</td>
           <td>{{ $historic -> function }}</td>
           <td>{{ $historic -> department }}</td>
           <td>{{ $historic -> email }}</td>
           <td>{{ $historic -> product }}</td>
           <td>{{ $historic -> code }}</td>
           <td>{{ $historic -> brand }}</td>
           <td>{{ $historic -> color }}</td>
           <td>{{ $historic -> size }}</td>
           <td>{{ $historic -> sexo }}</td>
           <td>{{ $historic -> observation }}</td>
           @if($historic -> breakdown)
           <td>sim</td>
           @else
           <td>não</td>
           @endif
           <td>{{ $historic -> description }}</td>
           @if($historic -> pending)
           <td>sim</td>
           @else
           <td>não</td>
           @endif
           <td>{{ date('d/m/Y H:i:s',strtotime($historic -> withdraw)) }}</td>
           <td>{{ date('d/m/Y H:i:s',strtotime($historic -> devolution)) }}</td>
           <td>{{ $historic -> days }}</td> 
        </tr>
        @endforeach
    </tbody>
</table>


