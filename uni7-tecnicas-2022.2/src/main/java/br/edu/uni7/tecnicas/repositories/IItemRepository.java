package br.edu.uni7.tecnicas.repositories;

import br.edu.uni7.tecnicas.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IItemRepository extends JpaRepository<Item, String> {
}
