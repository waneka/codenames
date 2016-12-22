defmodule Codenames.GameChannel do
  use Phoenix.Channel
  intercept ["message"]

  def join("game:" <> room_id, _params, socket) do
    {:ok, assign(socket, :room_id, room_id)}
  end

  def handle_in("message", payload, socket) do
    broadcast! socket, "message", payload
    {:noreply, socket}
  end

  def handle_out("message", payload, socket) do
    if current_room?(socket.assigns[:room_id], socket.topic) do
      push socket, "message", payload
      {:noreply,socket}
    else
      {:noreply, socket}
    end
  end

  defp current_room?(room_id, "game:" <> sub_topic) do
    room_id == sub_topic
  end
end
