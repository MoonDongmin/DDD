export class Ticket {
    public void;

    public execute(cmd: AddMessage) {
        let message = new Message(cmd.from, cmd.body);
        message.append(message);
    }

    public escalate(id: TicketId, reason: EscalaltionReason): ExecutionResule {
        try {
            let ticket = ticketRepository.load(id);
            let cmd = new Escalate(reason);

            ticket.execute(cmd);
            ticketRepository.save(ticket);
            return ExecutionResult.success();
        } catch (e) {
            return e.message;
        }
    }
}
