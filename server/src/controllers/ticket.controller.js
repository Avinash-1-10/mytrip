import Ticket from "../models/ticket.model.js";
import ApiResponse from "../utils/ApiResponse.js";

// Get all tickets
const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    if (!tickets) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "No tickets found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, tickets, "Tickets fetched successfully"));
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to fetch tickets"));
  }
};

// Get a single ticket by ID
const getTicket = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const ticket = await Ticket.findById(ticketId).populate();
    
    if (!ticket) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Ticket not found"));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, ticket, "Ticket fetched successfully"));
  } catch (error) {
    console.error("Error fetching ticket:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Failed to fetch ticket"));
  }
};

export { getAllTickets, getTicket };
