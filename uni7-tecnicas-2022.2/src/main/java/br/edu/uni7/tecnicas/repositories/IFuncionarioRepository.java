package br.edu.uni7.tecnicas.repositories;

import br.edu.uni7.tecnicas.entities.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFuncionarioRepository extends JpaRepository<Funcionario, Integer> {
}
