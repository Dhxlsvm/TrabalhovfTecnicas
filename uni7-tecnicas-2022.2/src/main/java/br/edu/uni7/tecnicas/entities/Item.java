package br.edu.uni7.tecnicas.entities;

import javax.persistence.*;
import java.time.Duration;
import java.time.Instant;
import java.util.Calendar;
import java.util.Date;

@Entity
@Table
public class Item {
    private String modelo;
    private String fabricante;
    private String anoFabricacao;


    private Date data;

    @Id
    private String codigo;

    @ManyToOne
    private Funcionario funcionario;



    @Deprecated
    protected Item() {
    }

    public Item(String modelo, String fabricante, Funcionario funcionario, String codigo, Date data){
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.data = data;
        this.funcionario = funcionario;
        this.codigo = codigo;
    }

    public String getModelo() {
        return modelo;
    }

    public void setModelo(String mensagem) {
        this.modelo = mensagem;
    }
    public String getFabricante() {
        return fabricante;
    }

    public void setFabricante(String fabricante) {
        this.fabricante = fabricante;
    }
    public String getAnoFabricacao() {
        return anoFabricacao;
    }

    public void setAnoFabricacao(String anoFabricacao) {
        this.anoFabricacao = anoFabricacao;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public Date getDiaData()
    {
        Calendar cal = Calendar.getInstance();

        cal.setTime(data);

        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);

        return cal.getTime();
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }


    public String getIntervaloCommit()
    {
        String grandeza = "hours";

        Instant inicio = data.toInstant();
        Instant termino = Instant.now();

        Duration intervalo = Duration.between(inicio, termino);

        long intervaloTempo = intervalo.toMinutes();

        if(intervaloTempo < 60) {
            grandeza = "minutes";

            if (intervaloTempo < 2)
                grandeza = "minute";
        }
        else if(intervaloTempo >= 60 && intervaloTempo < 1440)
        {
            if(intervaloTempo < 120)
                grandeza = "hour";

            intervaloTempo = intervalo.toHours();
        }
        else if(intervaloTempo >= 1440)
        {
            grandeza = "days";

            if (intervaloTempo < 2880)
                grandeza = "day";

            intervaloTempo = intervalo.toDays();
        }

        return intervaloTempo + " " + grandeza;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    @Override
    public String toString() {
        return "item{" +
                "modelo='" + modelo + '\'' +
                ", fabricante=" + fabricante +
                ", data=" + data +
                ", codigo=" + codigo +
                '}';
    }
}
