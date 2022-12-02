package br.edu.uni7.tecnicas.entities;

import javax.persistence.*;

@Entity
@Table
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int matricula;

    private String nome;

    @Deprecated
    protected Funcionario() {
    }

    public Funcionario(String nome)

    {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public int getMatricula() { return matricula; }

}
