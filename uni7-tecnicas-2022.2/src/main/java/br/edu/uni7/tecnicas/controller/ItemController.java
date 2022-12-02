package br.edu.uni7.tecnicas.controller;

import br.edu.uni7.tecnicas.common.Sha256Generator;
import br.edu.uni7.tecnicas.entities.Item;
import br.edu.uni7.tecnicas.repositories.IItemRepository;
import br.edu.uni7.tecnicas.repositories.IFuncionarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class ItemController {

    private final IItemRepository itemRepository;
    private final IFuncionarioRepository funcionarioRepository;

    public ItemController(IItemRepository itemRepository, IFuncionarioRepository funcionarioRepository) {
        this.itemRepository = itemRepository;
        this.funcionarioRepository = funcionarioRepository;
    }

    @PostMapping("api/inventario")
    public ResponseEntity createCommit(@RequestBody Item item) {

        if(item != null)
            {
                String codigoCommit = Sha256Generator.sha256(item.getModelo() + item.getFabricante() + item.getAnoFabricacao() + item.getFuncionario() + new Random().nextInt());

                funcionarioRepository.save(item.getFuncionario());

                item.setCodigo(codigoCommit);
                item.setData(new Date());

                itemRepository.save(item);

                return new ResponseEntity(HttpStatus.CREATED);
            }


        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @PutMapping("api/inventario")
    public ResponseEntity updateCommit(@RequestBody Item item)
    {
        if(item != null)
        {
            if(itemRepository.existsById(item.getCodigo()))
            {
                funcionarioRepository.save(item.getFuncionario());

                item.setData(new Date());

                itemRepository.save(item);

                return new ResponseEntity(HttpStatus.CREATED);
            }

            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @DeleteMapping("api/inventario")
    public ResponseEntity deleteCommit(@RequestBody Item item)
    {
        if(item != null && item.getCodigo() != null && item.getCodigo().trim() != "")
        {
            if(itemRepository.existsById(item.getCodigo()))
            {
                item = itemRepository.getReferenceById(item.getCodigo());

                itemRepository.delete(item);

                funcionarioRepository.delete(item.getFuncionario());

                return new ResponseEntity(HttpStatus.OK);
            }

            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("api/inventario/{codigoCommit}")
    public Item getCommit(@PathVariable String codigoCommit)
    {
        Item itemRetorno = null;

        if(codigoCommit != null && codigoCommit.trim() != "")
        {
            if(itemRepository.existsById(codigoCommit))
            {
                itemRetorno = itemRepository.findById(codigoCommit).get();
            }
        }

        return itemRetorno;
    }

    @GetMapping ("api/inventario")
    public Map<Date, List<Item>> listCommits() {

        Map<Date, List<Item>> commitsAgrupados = itemRepository.findAll().stream().collect(Collectors.groupingBy(c -> c.getDiaData()));

        return commitsAgrupados;
    }

}
